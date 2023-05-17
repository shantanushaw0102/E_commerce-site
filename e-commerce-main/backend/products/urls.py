from django.urls import path
from . import views

urlpatterns = [
    path("", views.getRoutes),
    path("api/getCategories/", views.getCategories, name="getCategories"),
    path("api/allProducts/", views.getAllProducts, name="AllProducts"),
    path("api/product/", views.getProduct, name="Product"),
    path("api/product/sellers/", views.getProductSellers, name="ProductSellers"),
    path("api/product/wishlist/", views.AddRemoveWishlist, name="Wishlist"),
    path("api/product/wishlistItems/", views.WishlistItems, name="WishlistItems"),
    path("api/product/cart/", views.AddRemoveCart, name="Cart"),
    path("api/product/cartItems/", views.CartItems, name="CartItems"),
    path("api/product/cartItems/full/", views.CartItemsDetailed, name="CartItemsDetailed"),
    path("api/product/order/", views.Order, name="Order"),
    path("api/product/orderConfirm/", views.OrderConfirm, name="Order"),
    path("api/product/orderHistory/", views.OrderHistory, name="OrderHistory"),
]
