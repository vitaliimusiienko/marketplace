from django.urls import path
from .views import ProductReviewListCreateView, SellerReviewListCreateView

urlpatterns = [
    path('products/<int:product_id>/reviews/', ProductReviewListCreateView.as_view(), name='product-reviews'),
    path('products/<int:seller_id>/seller-reviews/', SellerReviewListCreateView.as_view(), name='submit_seller_review')
]