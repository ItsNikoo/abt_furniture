from django.core.mail import send_mail
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from catalog.forms import ContactForm
from catalog.models import Category, Style, Product, Material, FirstPage, ContactRequest
from catalog.serializers import CategorySerializer, StyleSerializer, ProductSerializer, MaterialSerializer, \
    FirstPageSerializer
from furniture_catalog import settings
from services.yandex_storage import delete_from_yandex_storage
from logging import getLogger

from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework import permissions



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class FirstPageViewSet(ModelViewSet):
    queryset = FirstPage.objects.all()
    serializer_class = FirstPageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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


# knox views

class LoginAPI(KnoxLoginView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)
        return Response({
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
            }
        })

class UserAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username
        })


class ContactAPI(APIView):
    permission_classes = [permissions.AllowAny]  # Разрешить доступ всем

    def post(self, request):
        form = ContactForm(request.data)
        if form.is_valid():
            phone = form.cleaned_data['phone']
            comment = form.cleaned_data['comment']
            product = form.cleaned_data['product']
            consent = form.cleaned_data['consent']

            # Сохранение в базу
            contact_request = ContactRequest.objects.create(
                phone=phone,
                comment=comment,
                product=product,
                consent=consent
            )

            # Получаем IP-адрес для отслеживания
            ip_address = request.META.get('REMOTE_ADDR', 'Unknown')

            # Формируем сообщение
            subject = 'Новое сообщение с сайта АБТ'
            message = f'''
            Новое сообщение:
            Номер телефона: {phone}
            Комментарий: {comment or 'Не указан'}
            Продукт: {product or 'Не указан'}
            Согласие на обработку данных: {'Да' if consent else 'Нет'}
            Время создания: {contact_request.created_at}
            IP-адрес: {ip_address}
            '''
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = ['info@kuhni-abt.ru']

            try:
                send_mail(subject, message, from_email, recipient_list)
                return Response({'message': 'Сообщение успешно отправлено'}, status=status.HTTP_200_OK)
            except Exception as e:
                logger = getLogger(__name__)
                logger.error(f"Ошибка при отправке письма: {str(e)}")
                return Response({'error': f'Ошибка при отправке письма: {str(e)}'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)