from django.db import models
from django.utils.crypto import get_random_string
from apps.users.models import SellerProfile, CustomUser
from apps.promotions.models import Promotion
from decimal import Decimal
   
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    seller = models.ForeignKey(SellerProfile, verbose_name='seller', on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    article = models.CharField(max_length=20, unique=True, blank=True, editable=False)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
      
    def get_discounted_price(self):
      if self.promotion and self.promotion.is_active():
        discount_percentage = Decimal(self.promotion.discount_percentage)
        return (self.price - (self.price * (discount_percentage / Decimal('100')))).quantize(Decimal('0.01'))
      return self.price
    
    def save(self, *args, **kwargs):
      if not self.article:
        self.article = self.generate_unique_article()
      super().save(*args, **kwargs)
        
    def generate_unique_article(self):
      prefix = 'ART'
      unique_part = get_random_string(length=8, allowed_chars='0123456789')
      return f'{prefix}{unique_part}'
    
class Purchase(models.Model):
  user = models.ForeignKey(CustomUser, related_name='purchases', on_delete=models.CASCADE)
  product = models.ForeignKey(Product, related_name='purchases', on_delete=models.CASCADE)
  quantity = models.PositiveIntegerField()
  purchased_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"{self.user} purchased {self.product} on {self.purchased_at}"