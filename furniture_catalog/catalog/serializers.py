from rest_framework import serializers
from services.yandex_storage import upload_to_yandex_storage, delete_from_yandex_storage
import uuid
from catalog.models import Category, Style, Photo, Product, FirstPage, Material


class CategorySerializer(serializers.ModelSerializer):
    photo_file = serializers.FileField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Category
        fields = ['id', 'category_slug', 'category', 'photo', 'photo_file']

    def validate_photo_file(self, value):
        if value:
            # Проверка размера файла (например, не больше 5 МБ)
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("Размер файла не должен превышать 5 МБ.")
            # Проверка расширения файла
            if not value.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                raise serializers.ValidationError("Поддерживаются только файлы PNG, JPG, JPEG.")
        return value

    def validate_category_slug(self, value):
        # Проверка уникальности category_slug
        if self.instance:
            if Category.objects.filter(category_slug=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("Категория с таким slug уже существует.")
        else:
            if Category.objects.filter(category_slug=value).exists():
                raise serializers.ValidationError("Категория с таким slug уже существует.")
        return value

    def create(self, validated_data):
        photo_file = validated_data.pop('photo_file', None)
        category = Category.objects.create(**validated_data)

        if photo_file:
            try:
                # Генерируем уникальное имя файла
                filename = f"{uuid.uuid4()}_{photo_file.name}"
                file_url = upload_to_yandex_storage(photo_file.file, filename)
                category.photo = file_url  # Используем поле photo, а не photo_url
                category.save()
            except Exception as e:
                category.delete()  # Удаляем категорию при ошибке
                raise serializers.ValidationError({'photo_file': f"Ошибка загрузки: {str(e)}"})

        return category

    def update(self, instance, validated_data):
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
                file_url = upload_to_yandex_storage(photo_file.file, filename)
                instance.photo = file_url
                instance.save()

                # Удаляем старое фото из Yandex Cloud, если оно было
                if old_photo_url:
                    try:
                        delete_from_yandex_storage(old_photo_url)
                    except Exception as e:
                        # Логируем ошибку, но не прерываем выполнение
                        from logging import getLogger
                        logger = getLogger(__name__)
                        logger.error(f"Ошибка удаления старого файла: {str(e)}")
            except Exception as e:
                raise serializers.ValidationError({'photo_file': f"Ошибка загрузки: {str(e)}"})

        return instance


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ['id', 'style']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'photo_url']


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'material']


class ProductSerializer(serializers.ModelSerializer):
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
    photos = PhotoSerializer(many=True, required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'category', 'material', 'style', 'photos']


class FirstPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstPage
        fields = ['id', 'title', 'description', 'photo', 'link']
