# Generated by Django 4.0.1 on 2022-05-02 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_orders_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='order_id',
            field=models.CharField(max_length=128),
        ),
    ]
