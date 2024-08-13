from django.urls import path
from .views import ProductReviewListCreateView, submit_seller_review

urlpatterns = [
    path('products/<int:product_id>/reviews/', ProductReviewListCreateView.as_view(), name='product-reviews'),
    path('products/<int:product_id>/seller-reviews/', submit_seller_review, name='submit_seller_review')
]