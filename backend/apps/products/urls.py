from django.urls import path, include
from . import views
urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/',views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='detail-product'),
    path('products/<int:product_id>/purchase/', views.purchase_product, name='purchase-product'),
    path('products/create/', views.create_product, name='create-product'),
    path('discounted-products/', views.DiscountedProductListView.as_view(), name='discounted-products')
    ]