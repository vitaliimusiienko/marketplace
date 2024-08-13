from rest_framework import generics, permissions
from .models import ProductReview
from .serializers import ProductReviewSerializer

class ProductReviewListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductReview.objects.filter(product_id=product_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=request.user, product_id=self.kwargs['product_id'])
    
