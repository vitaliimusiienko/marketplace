from rest_framework import generics, viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .serializers import ProductSerializer
from .models import Product

class ProductViewsSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        if self.request.user.is_staff:
            serializer.save()
        else:
            raise PermissionDenied("You don't have permission to create products")
    
class ProductDetailView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
