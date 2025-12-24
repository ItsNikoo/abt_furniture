"""Serializers"""

import uuid
import re

from rest_framework import serializers

from services.yandex_storage import (
    upload_to_yandex_storage,
    delete_from_yandex_storage
)
from catalog.models import Category, Style, Photo, Product, FirstPage, Material


class CategorySerializer(serializers.ModelSerializer):
    """Serializer для категории с логикой взаимодействия с фото."""

    photo_file = serializers.FileField(
        write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Category
        fields = ['id', 'category_slug', 'category', 'photo', 'photo_file']

    def validate_photo_file(self, value):
        """Валидация фото."""
        if value:
            # Проверка размера файла (например, не больше 5 МБ)
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError(
                    "Размер файла не должен превышать 5 МБ."
                )
            # Проверка расширения файла
            if not value.name.lower().endswith(
                    ('.png', '.jpg', '.jpeg', '.webp')
            ):
                raise serializers.ValidationError(
                    "Поддерживаются только файлы PNG, JPG, JPEG, WEBP"
                )
        return value

    def validate_category_slug(self, value):
        """Валидация уникальности категории."""
        if self.instance:
            if Category.objects.filter(category_slug=value).exclude(
                    id=self.instance.id
            ).exists():
                raise serializers.ValidationError(
                    "Категория с таким slug уже существует."
                )
        else:
            if Category.objects.filter(category_slug=value).exists():
                raise serializers.ValidationError(
                    "Категория с таким slug уже существует."
                )
        return value

    def create(self, validated_data):
        """Создание категории с логикой добавления фото."""
        photo_file = validated_data.pop('photo_file', None)
        category = Category.objects.create(**validated_data)

        if photo_file:
            try:
                # Генерируем уникальное имя файла
                filename = f"{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "categories"
                )
                category.photo = file_url
                category.save()
            except Exception as e:
                category.delete()
                raise serializers.ValidationError(
                    {'photo_file': f"Ошибка загрузки: {str(e)}"}
                )

        return category

    def update(self, instance, validated_data):
        """Обновление категории с обновлением фото."""
        photo_file = validated_data.pop('photo_file', None)
        old_photo_url = instance.photo if instance.photo else None

        # Обновляем остальные поля
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Обработка загрузки нового фото
        if photo_file:
            try:
                # Генерируем уникальное имя файла
                filename = f"{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "categories"
                )
                instance.photo = file_url
                instance.save()

                # Удаляем старое фото из Yandex Cloud, если оно было
                if old_photo_url:
                    try:
                        delete_from_yandex_storage(old_photo_url)
                    except Exception as e:
                        raise serializers.ValidationError(
                            {'old_photo': f"Ошибка удаления старого файла: {str(e)}"}
                        )
            except Exception as e:
                raise serializers.ValidationError(
                    {'photo_file': f"Ошибка загрузки: {str(e)}"}
                )

        return instance


class StyleSerializer(serializers.ModelSerializer):
    """Serializer для стиля."""

    class Meta:
        model = Style
        fields = ['id', 'style']


class PhotoSerializer(serializers.ModelSerializer):
    """Serializer для фото."""

    class Meta:
        model = Photo
        fields = ['id', 'photo_url']


class MaterialSerializer(serializers.ModelSerializer):
    """Serializer для материала."""

    class Meta:
        model = Material
        fields = ['id', 'material']


class ProductSerializer(serializers.ModelSerializer):
    """Serializer для модели продукта с логикой добавления фотографий."""

    category = serializers.SlugRelatedField(
        slug_field='category',
        queryset=Category.objects.all()
    )
    style = serializers.SlugRelatedField(
        slug_field='style',
        queryset=Style.objects.all(),
        required=False
    )
    material = serializers.SlugRelatedField(
        slug_field='material',
        queryset=Material.objects.all(),
        required=False
    )
    photos = PhotoSerializer(many=True, required=False, read_only=True)
    price = serializers.DecimalField(
        max_digits=10, decimal_places=2, coerce_to_string=False
    )
    photo_files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True,
        required=False,
        allow_empty=True
    )
    delete_photos = serializers.ListField(
        child=serializers.URLField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'product_slug',
            'price',
            'description',
            'category',
            'material',
            'style',
            'photos',
            'photo_files',
            'delete_photos'
        ]

    def validate_photo_files(self, value):
        """Валидация фото."""
        for file in value:
            # Проверка размера файла (не больше 5 МБ)
            if file.size > 5 * 1024 * 1024:
                raise serializers.ValidationError(
                    f"Файл {file.name} превышает 5 МБ."
                )
            # Проверка расширения файла
            if not file.name.lower().endswith(
                    ('.png', '.jpg', '.jpeg', '.webp')
            ):
                raise serializers.ValidationError(
                    f"Файл {file.name} должен быть в формате "
                    "PNG, JPG, WEBP или JPEG."
                )
        return value

    def validate_title(self, value):
        # Очистка названия продукта для использования в качестве имени папки
        cleaned_title = re.sub(r'[^\w\s-]', '', value).strip().replace(
            ' ', '_'
        )
        if not cleaned_title:
            raise serializers.ValidationError(
                "Название продукта не может быть пустым или содержать "
                "только недопустимые символы."
            )
        return value

    def create(self, validated_data):
        """Создание продукта."""
        photo_files = validated_data.pop('photo_files', [])
        product = Product.objects.create(**validated_data)

        # Получаем очищенное название продукта для папки
        cleaned_title = re.sub(
            r'[^\w\s-]', '', product.title
        ).strip().replace(' ', '_')

        # Обработка загрузки фотографий
        for photo_file in photo_files:
            try:
                # Формируем путь с папкой products/ и именем продукта
                filename = f"{cleaned_title}/{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "products"
                )
                # Создаем объект Photo и связываем с продуктом
                photo = Photo.objects.create(photo_url=file_url)
                product.photos.add(photo)
            except Exception as e:
                # Если произошла ошибка, удаляем продукт
                # и уже загруженные фото
                for photo in product.photos.all():
                    try:
                        delete_from_yandex_storage(photo.photo_url)
                    except Exception as delete_error:
                        raise serializers.ValidationError(
                            {
                                'photo_cleanup':
                                    f"Ошибка удаления файла {photo.photo_url}: "
                                    f"{str(delete_error)}"
                            }
                        )
                product.delete()
                raise serializers.ValidationError(
                    {
                        'photo_files':
                            f"Ошибка загрузки файла {photo_file.name}: {str(e)}"
                    }
                )

        return product

    def update(self, instance, validated_data):
        """Обновление продукта."""
        delete_photos = validated_data.pop('delete_photos', [])
        photo_files = validated_data.pop('photo_files', [])

        # Удаление фото из Yandex Cloud и базы
        for url in delete_photos:
            try:
                photo = instance.photos.filter(photo_url=url).first()
                if photo:
                    delete_from_yandex_storage(url)
                    photo.delete()
            except Exception as e:
                raise serializers.ValidationError(
                    {'delete_photos': f"Ошибка при удалении фото {url}: {str(e)}"}
                )

        # Обработка загрузки новых фото (если есть)
        for photo_file in photo_files:
            try:
                cleaned_title = re.sub(
                    r'[^\w\s-]', '', instance.title
                ).strip().replace(' ', '_')
                filename = f"{cleaned_title}/{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "products"
                )
                photo = Photo.objects.create(photo_url=file_url)
                instance.photos.add(photo)
            except Exception as e:
                raise serializers.ValidationError(
                    {'photo_files': f"Ошибка загрузки: {str(e)}"}
                )

        # Обновление остальных полей
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class FirstPageSerializer(serializers.ModelSerializer):
    """Serializer для акции."""

    photo_file = serializers.FileField(write_only=True, required=True)

    class Meta:
        model = FirstPage
        fields = ['id', 'description', 'photo', 'link', 'photo_file']
        extra_kwargs = {
            'photo': {'read_only': True}
        }

    def create(self, validated_data):
        """Создание акции."""
        photo_file = validated_data.pop('photo_file', None)

        instance = super().create(validated_data)

        if photo_file:
            try:
                folder = "sales"
                file_url = upload_to_yandex_storage(
                    photo_file, photo_file.name, folder
                )
                instance.photo = file_url
                instance.save()
            except Exception as e:
                instance.delete()
                raise serializers.ValidationError(
                    {'photo_file': f"Ошибка загрузки файла: {str(e)}"}
                )

        return instance

    def update(self, instance, validated_data):
        """Обновление акции."""
        photo_file = validated_data.pop('photo_file', None)

        if photo_file:
            # Удаляем старое фото, если оно есть
            if instance.photo:
                try:
                    delete_from_yandex_storage(instance.photo)
                except Exception as e:
                    raise serializers.ValidationError(
                        {'old_photo': f"Ошибка удаления старого файла: {str(e)}"}
                    )

            # Загружаем новое фото
            try:
                folder = "sales"
                file_url = upload_to_yandex_storage(
                    photo_file, photo_file.name, folder
                )
                validated_data['photo'] = file_url
            except Exception as e:
                raise serializers.ValidationError(
                    {'photo_file': f"Ошибка загрузки файла: {str(e)}"}
                )

        return super().update(instance, validated_data)
