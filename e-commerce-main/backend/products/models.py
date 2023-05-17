from asyncio.windows_events import NULL
from itertools import product
from operator import mod
from django.db import models
from django_extensions.db.fields import AutoSlugField
from authapp.models import User
from django.db.models.deletion import CASCADE
import random

class Category(models.Model):
    parent = models.ForeignKey(
        "self", related_name="children", on_delete=models.CASCADE, blank=True, null=True
    )
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="title", unique=True, null=False, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "slug",
            "parent",
        )
        verbose_name_plural = "categories"

    def __str__(self):
        full_path = [self.title]
        k = self.parent
        while k is not None:
            full_path.append(k.title)
            k = k.parent
        return " -> ".join(full_path[::-1])


class ProductImage(models.Model):
    file = models.FileField(upload_to="media/productImage/%Y/%m/%d")

    def __str__(self):
        return f"{self.file.name}"


class Product(models.Model):
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=1024)
    time = models.DateTimeField(auto_now=True, auto_now_add=False)
    price = models.ForeignKey("Prices", on_delete=models.SET_NULL, null=True, blank=True)
    sellers = models.ManyToManyField(User, through="Product_Seller")
    item_category = models.ForeignKey(
        Category,
        related_name="item_with_category",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    images = models.ManyToManyField(ProductImage)

    @property
    def currentSeller(self):
        list = Product_Seller.objects.filter(product=self.id, count__gt=0)
        if not list:
            return NULL
        return (random.choice(list)).seller.id

    def __str__(self):
        return f"{self.title}"


class Product_Seller(models.Model):
    product = models.ForeignKey(Product, on_delete=CASCADE, null=True)
    seller = models.ForeignKey(User, on_delete=CASCADE)
    count = models.IntegerField()

    @property
    def inStock(self):
        if self.count > 0:
            return True
        return False

    def __str__(self):
        return f"{self.product.title} : {self.seller.first_name}"


class Prices(models.Model):
    price = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=CASCADE, null=True)
    product_id = models.ForeignKey(Product, on_delete=CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name}: {self.product_id.title} price: {self.price}"


class Wishlist(models.Model):
    active = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=CASCADE, null=True)


class Cart(models.Model):
    active = models.BooleanField(default=False)
    buyer = models.ForeignKey(User, on_delete=CASCADE, null=True, related_name='buyer_in_cart' )
    product = models.ForeignKey(Product, on_delete=CASCADE, null=True)
    seller = models.ForeignKey(User, on_delete=CASCADE, null=True, related_name='seller_in_cart')

class Orders(models.Model):
    Order_Status = (
        ('pending', 'Payment Pending'),
        ('confirmed', 'Confirmed'),
        ('dispatched', 'dispatched'),
        ('delivered', 'Delivered'),
    )
    order_id = models.CharField(max_length=128)
    order_status = models.CharField(max_length=20, choices=Order_Status, default='pending')
    seller = models.ForeignKey(User, on_delete=CASCADE, null=True, related_name='seller_in_order')
    buyer = models.ForeignKey(User, on_delete=CASCADE, null=True, related_name='buyer_in_order')
    product = models.ForeignKey(Product, on_delete=CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    item_price = models.PositiveIntegerField(null=True)