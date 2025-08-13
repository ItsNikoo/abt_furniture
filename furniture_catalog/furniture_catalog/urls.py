from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from knox import views as knox_views

from catalog.views import CategoryViewSet, StylesViewSet, ProductViewSet, MaterialViewSet, FirstPageViewSet, LoginAPI, \
    UserAPI, ContactAPI

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'styles', StylesViewSet, basename='style')
router.register(r'materials', MaterialViewSet, basename="material")
router.register(r'products', ProductViewSet, basename='product')
router.register(r'sales', FirstPageViewSet, basename='first_page')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/login/', LoginAPI.as_view(), name='login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/auth/user/', UserAPI.as_view(), name='user'),
    path('api/contact/', ContactAPI.as_view(), name='contact'),
]
