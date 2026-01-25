"""Serializers"""

import uuid
import re

from rest_framework import serializers

from services.yandex_storage import (
    upload_to_yandex_storage,
    delete_from_yandex_storage
)
from catalog.models import Category, Style, Photo, Product, FirstPage, Material, Promotion, ContactRequest, Review


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

    photo_file = serializers.FileField(write_only=True, required=False)
    mobile_photo_file = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = FirstPage
        fields = [
            'id',
            'description',
            'photo',
            'mobile_photo',
            'link',
            'photo_file',
            'mobile_photo_file'
        ]
        extra_kwargs = {
            'photo': {'read_only': True},
            'mobile_photo': {'read_only': True}
        }

    def validate(self, data):
        """Валидация: при создании требуется хотя бы одно фото."""
        if self.instance is None:  # Создание нового объекта
            if not data.get('photo_file') and not data.get('mobile_photo_file'):
                raise serializers.ValidationError(
                    "Необходимо загрузить хотя бы одно фото (desktop или mobile)"
                )
        return data

    def _get_folder_path(self, instance_id):
        """Генерация пути к папке акции."""
        return f"sales/sale_{instance_id}"

    def create(self, validated_data):
        """Создание акции."""
        photo_file = validated_data.pop('photo_file', None)
        mobile_photo_file = validated_data.pop('mobile_photo_file', None)

        # Сначала создаем объект без фото
        instance = super().create(validated_data)

        try:
            # Папка для этой конкретной акции
            folder = self._get_folder_path(instance.id)

            # Загружаем desktop фото
            if photo_file:
                file_url = upload_to_yandex_storage(
                    photo_file,
                    f"desktop_{photo_file.name}",
                    folder
                )
                instance.photo = file_url

            # Загружаем mobile фото
            if mobile_photo_file:
                mobile_url = upload_to_yandex_storage(
                    mobile_photo_file,
                    f"mobile_{mobile_photo_file.name}",
                    folder
                )
                instance.mobile_photo = mobile_url

            instance.save()

        except Exception as e:
            # Если произошла ошибка, удаляем созданный объект
            instance.delete()
            raise serializers.ValidationError(
                {'file_upload': f"Ошибка загрузки файла: {str(e)}"}
            )

        return instance

    def update(self, instance, validated_data):
        """Обновление акции."""
        photo_file = validated_data.pop('photo_file', None)
        mobile_photo_file = validated_data.pop('mobile_photo_file', None)

        # Папка для этой конкретной акции
        folder = self._get_folder_path(instance.id)

        # Обновление desktop фото
        if photo_file:
            # Удаляем старое desktop фото
            if instance.photo:
                try:
                    delete_from_yandex_storage(instance.photo)
                except Exception as e:
                    raise serializers.ValidationError(
                        {'old_photo': f"Ошибка удаления старого desktop файла: {str(e)}"}
                    )

            # Загружаем новое desktop фото
            try:
                file_url = upload_to_yandex_storage(
                    photo_file,
                    f"desktop_{photo_file.name}",
                    folder
                )
                validated_data['photo'] = file_url
            except Exception as e:
                raise serializers.ValidationError(
                    {'photo_file': f"Ошибка загрузки desktop файла: {str(e)}"}
                )

        # Обновление mobile фото
        if mobile_photo_file:
            # Удаляем старое mobile фото
            if instance.mobile_photo:
                try:
                    delete_from_yandex_storage(instance.mobile_photo)
                except Exception as e:
                    raise serializers.ValidationError(
                        {'old_mobile_photo': f"Ошибка удаления старого mobile файла: {str(e)}"}
                    )

            # Загружаем новое mobile фото
            try:
                mobile_url = upload_to_yandex_storage(
                    mobile_photo_file,
                    f"mobile_{mobile_photo_file.name}",
                    folder
                )
                validated_data['mobile_photo'] = mobile_url
            except Exception as e:
                raise serializers.ValidationError(
                    {'mobile_photo_file': f"Ошибка загрузки mobile файла: {str(e)}"}
                )

        return super().update(instance, validated_data)


class PromotionSerializer(serializers.ModelSerializer):
    """Serializer для сущности спецпредложений с логикой добавления фотографий"""
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
        model = Promotion
        fields = [
            'id',
            'title',
            'product_slug',
            'price',
            'description',
            'size',
            'category',
            'material',
            'style',
            'photos',
            'photo_files',
            'delete_photos'
        ]

    def validate_photo_files(self, value):
        """Валидация фото"""
        for file in value:
            if file.size > 5 * 1024 * 1024:
                raise serializers.ValidationError(
                    f"Файл {file.name} превышает 5 МБ."
                )
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

    def validate_product_slug(self, value):
        """Валидация уникальности slug."""
        if self.instance:
            if Promotion.objects.filter(product_slug=value).exclude(
                    id=self.instance.id
            ).exists():
                raise serializers.ValidationError(
                    "Акционный продукт с таким slug уже существует."
                )
        else:
            if Promotion.objects.filter(product_slug=value).exists():
                raise serializers.ValidationError(
                    "Акционный продукт с таким slug уже существует."
                )
        return value

    def create(self, validated_data):
        """Создание акционного продукта."""
        photo_files = validated_data.pop('photo_files', [])
        promotion = Promotion.objects.create(**validated_data)

        # Получаем очищенное название продукта для папки
        cleaned_title = re.sub(
            r'[^\w\s-]', '', promotion.title
        ).strip().replace(' ', '_')

        # Обработка загрузки фотографий
        for photo_file in photo_files:
            try:
                # Формируем путь с папкой promotions/ и именем продукта
                filename = f"{cleaned_title}/{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "promotions"
                )
                # Создаем объект Photo и связываем с акционным продуктом
                photo = Photo.objects.create(photo_url=file_url)
                promotion.photos.add(photo)
            except Exception as e:
                # Если произошла ошибка, удаляем продукт
                # и уже загруженные фото
                for photo in promotion.photos.all():
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
                promotion.delete()
                raise serializers.ValidationError(
                    {
                        'photo_files':
                            f"Ошибка загрузки файла {photo_file.name}: {str(e)}"
                    }
                )

        return promotion

    def update(self, instance, validated_data):
        """Обновление акционного продукта."""
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
                    photo_file.file, filename, "promotions"
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


class ContactRequestSerializer(serializers.ModelSerializer):
    """Сериализатор для контактных запросов."""

    class Meta:
        model = ContactRequest
        fields = ['id', 'name', 'phone', 'email', 'comment', 'product', 'consent', 'created_at']  # Добавлено 'email'
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        """Валидация имени."""
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Имя обязательно для заполнения.")
        if len(value) > 50:
            raise serializers.ValidationError(
                "Имя не должно превышать 50 символов."
            )
        return value.strip()

    def validate_email(self, value):
        """Валидация email (необязательное поле)."""
        if value and '@' not in value:
            raise serializers.ValidationError("Введите корректный email адрес.")
        return value.strip() if value else value

    def validate_consent(self, value):
        """Проверка согласия на обработку данных."""
        if not value:
            raise serializers.ValidationError(
                "Необходимо согласие на обработку персональных данных."
            )
        return value

class ReviewSerializer(serializers.ModelSerializer):
    """Serializer для отзывов с логикой добавления фотографий."""

    photos = PhotoSerializer(many=True, required=False, read_only=True)
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
        model = Review
        fields = [
            'id',
            'name',
            'review',
            'rank',
            'date',
            'location',
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

    def validate_name(self, value):
        """Очистка имени для использования в качестве имени папки."""
        cleaned_name = re.sub(r'[^\w\s-]', '', value).strip().replace(
            ' ', '_'
        )
        if not cleaned_name:
            raise serializers.ValidationError(
                "Имя не может быть пустым или содержать "
                "только недопустимые символы."
            )
        return value

    def create(self, validated_data):
        """Создание отзыва."""
        photo_files = validated_data.pop('photo_files', [])
        review = Review.objects.create(**validated_data)

        # Получаем очищенное имя для папки
        cleaned_name = re.sub(
            r'[^\w\s-]', '', review.name
        ).strip().replace(' ', '_')

        # Обработка загрузки фотографий
        for photo_file in photo_files:
            try:
                # Формируем путь с папкой reviews/ и именем автора
                filename = f"{cleaned_name}/{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "reviews"
                )
                # Создаем объект Photo и связываем с отзывом
                photo = Photo.objects.create(photo_url=file_url)
                review.photos.add(photo)
            except Exception as e:
                # Если произошла ошибка, удаляем отзыв
                # и уже загруженные фото
                for photo in review.photos.all():
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
                review.delete()
                raise serializers.ValidationError(
                    {
                        'photo_files':
                            f"Ошибка загрузки файла {photo_file.name}: {str(e)}"
                    }
                )

        return review

    def update(self, instance, validated_data):
        """Обновление отзыва."""
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
                cleaned_name = re.sub(
                    r'[^\w\s-]', '', instance.name
                ).strip().replace(' ', '_')
                filename = f"{cleaned_name}/{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(
                    photo_file.file, filename, "reviews"
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
