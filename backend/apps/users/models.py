from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bank_card = models.CharField(max_length=16, blank=True, null=True)
    
    def __str__(self):
        return self.username

