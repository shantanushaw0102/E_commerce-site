# Generated by Django 4.0.1 on 2022-05-03 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0021_orders_item_price_alter_orders_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.prices'),
        ),
    ]