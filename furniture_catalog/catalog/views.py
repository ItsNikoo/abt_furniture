from datetime import timedelta

from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from catalog.models import Category, Style, Product, Material, FirstPage, ContactRequest, Promotion
from catalog.serializers import CategorySerializer, StyleSerializer, ProductSerializer, MaterialSerializer, \
    FirstPageSerializer, PromotionSerializer, ContactRequestSerializer
from furniture_catalog import settings
from services.yandex_storage import delete_from_yandex_storage

from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework import permissions

from rest_framework.filters import OrderingFilter


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
            delete_from_yandex_storage(photo_url)
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

    filter_backends = [OrderingFilter]
    ordering_fields = ['price']
    ordering = ['id']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Извлекаем все связанные фотографии
        photos = instance.photos.all()
        photo_urls = [photo.photo_url for photo in photos]

        # Удаляем файлы из Yandex Cloud Storage
        for photo_url in photo_urls:
            delete_from_yandex_storage(photo_url)

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
        mobile_photo_url = instance.mobile_photo

        response = super().destroy(request, *args, **kwargs)

        # Удаляем desktop фото
        if photo_url:
            try:
                delete_from_yandex_storage(photo_url)
            except Exception as e:
                print(f"Ошибка удаления desktop фото: {str(e)}")

        # Удаляем mobile фото
        if mobile_photo_url:
            try:
                delete_from_yandex_storage(mobile_photo_url)
            except Exception as e:
                print(f"Ошибка удаления mobile фото: {str(e)}")

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
    """API для обработки контактных запросов."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """Создание нового контактного запроса."""
        serializer = ContactRequestSerializer(data=request.data)

        if serializer.is_valid():
            # Сохраняем в базу данных
            contact_request = serializer.save()

            # Получаем IP-адрес для логирования
            ip_address = request.META.get('REMOTE_ADDR', 'Unknown')

            # Формируем сообщение для email
            subject = 'Новое сообщение с сайта АБТ'
            message = f'''
            Новое сообщение с сайта:

            Имя: {contact_request.name}
            Номер телефона: {contact_request.phone}
            Комментарий: {contact_request.comment or 'Не указан'}
            Продукт: {contact_request.product or 'Не указан'}
            Согласие на обработку данных: {'Да' if contact_request.consent else 'Нет'}

            Время создания: {(contact_request.created_at + timedelta(hours=3)).strftime('%d.%m.%Y %H:%M:%S')} МСК
            IP-адрес: {ip_address}
                        '''

            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = ['info@kuhni-abt.ru']

            try:
                # Отправляем email
                send_mail(
                    subject,
                    message,
                    from_email,
                    recipient_list,
                    fail_silently=False
                )

                return Response({
                    'message': 'Сообщение успешно отправлено',
                    'id': contact_request.id
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                # Логируем ошибку, но запись в БД уже сохранена
                print(f"Ошибка отправки email: {str(e)}")

                return Response({
                    'message': 'Запрос сохранен, но возникла ошибка при отправке email',
                    'error': str(e),
                    'id': contact_request.id
                }, status=status.HTTP_201_CREATED)

        return Response({
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Получение списка контактных запросов (опционально, для админки)."""
        # Можно ограничить доступ только для staff
        if not request.user.is_staff:
            return Response(
                {'error': 'Доступ запрещен'},
                status=status.HTTP_403_FORBIDDEN
            )

        contacts = ContactRequest.objects.all().order_by('-created_at')
        serializer = ContactRequestSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HealthCheckView(APIView):
    permission_classes = []  # No authentication required

    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class PromotionViewSet(ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'

    filter_backends = [OrderingFilter]
    ordering_fields = ['price']
    ordering = ['id']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        photos = instance.photos.all()
        photo_urls = [photo.photo_url for photo in photos]

        for photo in photo_urls:
            delete_from_yandex_storage(photo)

        response = super().destroy(request, *args, **kwargs)
        return response

    def get_queryset(self):
        request: Request = self.request
        category_slug = request.query_params.get('category')
        style = request.query_params.get('style')
        material = request.query_params.get('material')

        base_qs = Promotion.objects.all()

        if category_slug:
            base_qs = base_qs.filter(category__category_slug=category_slug)

        if style:
            base_qs = base_qs.filter(style__style=style)

        if material:
            base_qs = base_qs.filter(material__material=material)

        return base_qs
