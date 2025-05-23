from rest_framework import serializers

from catalog.models import Category, Style, Photo, Product, FirstPage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_slug', 'category']


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ['id', 'style']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'photo_url']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field='category_slug',
        queryset=Category.objects.all()
    )
    styles = serializers.SlugRelatedField(
        slug_field='style',
        queryset=Style.objects.all(),
        many=True,
        required=False
    )
    photos = PhotoSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'category', 'styles', 'photos']


class FirstPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstPage
        fields = ['id', 'title', 'description', 'photo', 'link']
