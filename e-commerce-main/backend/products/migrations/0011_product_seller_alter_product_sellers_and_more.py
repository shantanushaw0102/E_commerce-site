# Generated by Django 4.0.1 on 2022-04-11 20:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0010_rename_watchlist_wishlist"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product_Seller",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        
        migrations.RemoveField(
            model_name="product",
            name="sellers",
        ),
        migrations.AddField(
            model_name="product",
            name="sellers",
            field=models.ManyToManyField(
                through="products.Product_Seller", to="products.Sellers"
            ),
        ),
        migrations.AddField(
            model_name="product_seller",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="products.product"
            ),
        ),
        migrations.AddField(
            model_name="product_seller",
            name="seller",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="products.sellers"
            ),
        ),
    ]
