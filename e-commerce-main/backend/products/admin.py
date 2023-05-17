from django.contrib import admin
from .models import (
    Category,
    Product,
    ProductImage,
    Prices,
    Wishlist,
    Cart,
    Product_Seller,
    Orders
)

# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Prices)
admin.site.register(Wishlist)
admin.site.register(Cart)
admin.site.register(Product_Seller)
admin.site.register(Orders)



class Product_Seller(admin.ModelAdmin):
    readonly_fields = ("inStock",)
