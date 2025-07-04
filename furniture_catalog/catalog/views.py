from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from catalog.models import Category, Style, Product, Material, FirstPage
from catalog.serializers import CategorySerializer, StyleSerializer, ProductSerializer, MaterialSerializer, \
    FirstPageSerializer
from services.yandex_storage import delete_from_yandex_storage
from logging import getLogger


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"

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
                logger = getLogger(__name__)
                logger.error(f"Ошибка при удалении файла для категории {instance.category_slug}: {str(e)}")
        return response


class StylesViewSet(ModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer
    lookup_field = 'id'


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Извлекаем все связанные фотографии
        photos = instance.photos.all()
        photo_urls = [photo.photo_url for photo in photos]

        # Удаляем файлы из Yandex Cloud Storage
        for photo_url in photo_urls:
            try:
                delete_from_yandex_storage(photo_url)
            except Exception as e:
                # Логируем ошибку, но не прерываем удаление
                logger = getLogger(__name__)
                logger.error(f"Ошибка при удалении файла {photo_url} для продукта {instance.title}: {str(e)}")

        # Удаляем продукт
        response = super().destroy(request, *args, **kwargs)
        return response

    def get_queryset(self):
        request: Request = self.request
        category_slug = request.query_params.get('category')
        style = request.query_params.get('style')
        material = request.query_params.get('material')
        base_qs = Product.objects.all()
        if category_slug:
            base_qs = base_qs.filter(category__category_slug=category_slug)

        if style:
            base_qs = base_qs.filter(style__style=style)

        if material:
            base_qs = base_qs.filter(material__material=material)
        return base_qs


class MaterialViewSet(ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


class FirstPageViewSet(ModelViewSet):
    queryset = FirstPage.objects.all()
    serializer_class = FirstPageSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        photo_url = instance.photo

        response = super().destroy(request, *args, **kwargs)

        if photo_url:
            try:
                delete_from_yandex_storage(photo_url)
            except Exception as e:
                logger.error(f"Ошибка при удалении файла: {str(e)}")

        return response
