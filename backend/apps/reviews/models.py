from django.db import models
from apps.users.models import CustomUser, SellerProfile
from apps.products.models import Product
from django.core.validators import MaxValueValidator

class ProductReview(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    comment = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} - {self.product.name}'
    
class SellerReview(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, related_name='review')
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    comment = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} - {self.seller.user.first_name}'
