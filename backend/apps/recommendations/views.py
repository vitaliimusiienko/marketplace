from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.products.models import Product, Purchase
from apps.products.serializers import ProductSerializer

class RecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        last_purchase = Purchase.objects.filter(user=user).order_by('purchased_at').first()
        
        if last_purchase:
            category = last_purchase.product.category
            
            return Product.objects.filter(category=category).exclude(id=last_purchase.product.id)
        return Product.objects.none()
