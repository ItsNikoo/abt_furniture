from django.db import models


class Category(models.Model):
    """Сущность категория"""
    category_slug = models.SlugField(max_length=200, unique=True)
    category = models.CharField(max_length=200, unique=True)
    photo = models.URLField(max_length=500, blank=True, null=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Style(models.Model):
    """Сущность стиль"""
    style = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Стиль"
        verbose_name_plural = "Стили"


class Material(models.Model):
    """Сущность материал"""
    material = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"


class Photo(models.Model):
    """Сущность фото"""
    photo_url = models.URLField(max_length=500)

    class Meta:
        verbose_name = "Фото"
        verbose_name_plural = "Фото"


class Product(models.Model):
    """Сущность продукт (основная сущность)"""
    title = models.CharField(max_length=300)
    product_slug = models.SlugField(max_length=200, unique=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    material = models.ForeignKey(
        Material,
        on_delete=models.CASCADE,
        related_name='products',
        null=True,
        blank=True
    )
    style = models.ForeignKey(
        Style,
        on_delete=models.CASCADE,
        related_name='products',
        null=True,
        blank=True
    )
    photos = models.ManyToManyField(Photo, related_name='products', blank=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ContactRequest(models.Model):
    """Сущность контакт"""
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254, blank=True)  # Добавлено: поле для email (необязательное)
    comment = models.TextField(blank=True)
    product = models.CharField(max_length=200, blank=True)  # Поле для продукта
    consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request from {self.phone} ({self.email or 'no email'}) for {self.product or 'no product'}"

class Promotion(models.Model):
    """Сущность спецпредложение"""
    title = models.CharField(max_length=300)
    product_slug = models.SlugField(max_length=200, unique=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    size = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    material = models.ForeignKey(
        Material,
        on_delete=models.CASCADE,
        related_name='promotions',
        null=True,
        blank=True
    )
    style = models.ForeignKey(
        Style,
        on_delete=models.CASCADE,
        related_name='promotions',
        null=True,
        blank=True
    )
    photos = models.ManyToManyField(Photo, related_name='promotions', blank=True)


class Review(models.Model):
    """Сущность отзыв"""
    name = models.CharField(max_length=50)
    review = models.TextField()
    rank = models.CharField(max_length=1, choices=[
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
        ('5', '5'),
    ])
    date = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    photos = models.ManyToManyField(Photo, related_name='reviews', blank=True)

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
