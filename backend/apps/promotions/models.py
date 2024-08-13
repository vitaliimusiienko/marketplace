from django.db import models
from datetime import timezone

class Promotion(models.Model):
  code = models.CharField(max_length=20, unique=True)
  discount_percentage = models.PositiveIntegerField()
  start_date = models.DateTimeField()
  end_date = models.DateTimeField()
  active = models.BooleanField(default=True)
  
  def __str__(self):
    return self.code
  
  def is_active(self):
    now = timezone.now()
    return self.active and self.start_date <= now <= self.end_date
