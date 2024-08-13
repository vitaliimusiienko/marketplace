from django.urls import path, include
from . import views
urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/',views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='detail-product'),
    path('products/<int:pk>/purchase/', views.purchase_product, name='purchase-product'),
    ]