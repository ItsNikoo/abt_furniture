from django.db import models
from pony.orm.ormtypes import Array


class Category(models.Model):
    category_slug = models.SlugField(max_length=200, unique=True)
    category = models.CharField(max_length=200, unique=True)
    photo = models.URLField(max_length=500, blank=True, null=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Style(models.Model):
    style = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Стиль"
        verbose_name_plural = "Стили"


class Photo(models.Model):
    photo_url = models.URLField(max_length=500)

    class Meta:
        verbose_name = "Фото"
        verbose_name_plural = "Фото"


class Product(models.Model):
    title = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    styles = models.ManyToManyField(Style, related_name='products', blank=True)
    photos = models.ManyToManyField(Photo, related_name='products', blank=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class FirstPage(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    photo = models.URLField(max_length=500)
    link = models.URLField(max_length=500)

    class Meta:
        verbose_name = "Карусель на первой странице"
