# Generated by Django 5.0.7 on 2024-08-08 14:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_category_product_article_product_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='update_at',
            new_name='updated_at',
        ),
    ]
