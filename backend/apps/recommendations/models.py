from django.db import models
from apps.users.models import CustomUser
from apps.products.models import Product

class Purchase(models.Model):
  user = models.ForeignKey(CustomUser, related_name='purchases', on_delete=models.CASCADE)
  product = models.ForeignKey(Product, related_name='purchases', on_delete=models.CASCADE)
  purchased_at = models.DateTimeField(auto_now_add=True)
