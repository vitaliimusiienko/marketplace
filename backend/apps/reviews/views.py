from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import ProductReview, SellerReview
from .serializers import ProductReviewSerializer, SellerReviewSerializer

class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    
class SellerReviewViewSet(viewsets.ModelViewSet):
    queryset = SellerReview
    serializer_class = SellerReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    
