# Generated by Django 5.0.7 on 2024-08-14 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_product_promotion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='article',
            field=models.CharField(blank=True, editable=False, max_length=20, unique=True),
        ),
    ]
