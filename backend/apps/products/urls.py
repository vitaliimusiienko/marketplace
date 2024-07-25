from django.urls import path
from .views import ProductDetailView, ProductListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='products'),
    path('products-detail/<int:pk>/', ProductDetailView.as_view(), name='product-detail')
]