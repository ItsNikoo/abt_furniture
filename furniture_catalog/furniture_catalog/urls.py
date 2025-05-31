from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from catalog.views import CategoryViewSet, StylesViewSet, ProductViewSet, MaterialViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'styles', StylesViewSet, basename='style')
router.register(r'materials', MaterialViewSet, basename="material")
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
