from django.shortcuts import render
from rest_framework import viewsets

from catalog.models import Category, Style, Product
from catalog.serializers import CategorySerializer, StyleSerializer, ProductSerializer
from services.yandex_storage import delete_from_yandex_storage


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'category_slug'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Извлекаем URL фото перед удалением
        photo_url = instance.photo
        # Удаляем категорию
        response = super().destroy(request, *args, **kwargs)
        # Удаляем файл из Yandex Cloud, если он есть
        if photo_url:
            try:
                delete_from_yandex_storage(photo_url)
            except Exception as e:
                # Логируем ошибку, но не прерываем ответ
                from logging import getLogger
                logger = getLogger(__name__)
                logger.error(f"Ошибка при удалении файла для категории {instance.category_slug}: {str(e)}")
        return response


class StylesViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer
    lookup_field = 'id'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'
