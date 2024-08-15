from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProductReview
from apps.products.models import Product
from .serializers import SellerReviewSerializer, ProductReviewSerializer

class ProductReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductReview.objects.filter(product_id=product_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product_id=self.kwargs['product_id'])
        
class SellerReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = SellerReviewSerializer

    def get_queryset(self):
        seller_id = self.kwargs['seller_id']
        return SellerReview.objects.filter(seller_id=seller_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, seller_id=self.kwargs['seller_id'])
    
