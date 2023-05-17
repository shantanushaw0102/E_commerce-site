# Generated by Django 4.0.1 on 2022-04-30 20:41

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0016_remove_cart_user_cart_buyer_cart_seller_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='name',
        ),
        migrations.AddField(
            model_name='order',
            name='order_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]