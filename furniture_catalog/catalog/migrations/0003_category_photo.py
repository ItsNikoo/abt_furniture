# Generated by Django 5.2.1 on 2025-05-29 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_alter_product_photos_alter_product_styles'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='photo',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
