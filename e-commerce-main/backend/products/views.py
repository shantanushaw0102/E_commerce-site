from urllib import response
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    CartItemsSerializer,
    CategorySerializer,
    ProductSerializer,
    ProductSellerSerializer,
    WishlistCreateSerializer,
    CartCreateSerializer,
    OrderHistorySerializer,
)
from .models import Category, Product, Product_Seller, Wishlist, Cart, Orders, Prices
from authapp.models import User
import uuid, json, requests
from products import serializers


@api_view(["POST"])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def getAllProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def getProduct(request):
    product_id = request.query_params["product_id"]
    products = Product.objects.get(id=product_id)
    serializer = ProductSerializer(products)
    return Response(serializer.data)


@api_view(["POST"])
def getProductSellers(request):
    product_id = request.query_params["product_id"]
    sellers_from_mtm = Product_Seller.objects.filter(product_id=product_id, count__gt=0)
    seller_ids = []
    for seller in sellers_from_mtm:
        seller_ids.append(seller.seller_id)
    sellers = User.objects.filter(id__in=seller_ids)
    serializer = ProductSellerSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddRemoveWishlist(request):
    print(request.data)
    wishlistobj = Wishlist.objects.filter(
        product=request.data["product"], user=request.user
    )
    if not wishlistobj:
        serializer = WishlistCreateSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        newWishlist = serializer.save()
        return Response(
            {
                "message": "added",
            }
        )

    if wishlistobj[0].active == True:
        wishlistobj[0].active = False
        wishlistobj[0].save()
        return Response(
            {
                "message": "removed",
            }
        )
    else:
        wishlistobj[0].active = True
        wishlistobj[0].save()
        return Response(
            {
                "message": "added",
            }
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def WishlistItems(request):
    wishlistobj = Wishlist.objects.filter(user=request.user, active=True)
    product_ids = []
    for products in wishlistobj:
        product_ids.append(products.product_id)
    products = Product.objects.filter(id__in=product_ids)

    print(products)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddRemoveCart(request):
    print(request.body)
    print(request.data["product"])
    print(request.data["seller"])
    cartobj = Cart.objects.filter(
        buyer=request.user,
        product=request.data["product"],
        seller=request.data["seller"],
    )

    if not cartobj:
        serializer = CartCreateSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        newCart = serializer.save()
        return Response(
            {
                "message": "added",
            }
        )

    else:
        if request.data["action"] == "True" or request.data["action"] == "False":
            cartobj[0].active = request.data["action"]
            cartobj[0].save()
            if request.data["action"] == "True":
                return Response(
                    {
                        "message": "added",
                    }
                )
            else:
                return Response(
                    {
                        "message": "removed",
                    }
                )

    return Response(
        {
            "message": "add remove cart called",
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CartItems(request):
    cartobj = Cart.objects.filter(buyer=request.user, active=True)
    serializer = CartItemsSerializer(cartobj, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def CartItemsDetailed(request):
    print(request.data)
    return Response({"status": "susuy"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def Order(request):
    # cartobj = Cart.objects.filter(buyer=request.user, active=True)
    print(request.data)
    for item in request.data:
        print(item)
    order_id = str(uuid.uuid4())
    print(order_id)
    amount = 0

    """ return Response(
        {
            "lol": "ok",
        }
    )  """
    for item in request.data:
        product = Product.objects.get(id=item["product_id"])
        seller = User.objects.get(id=item["seller_id"])
        product_seller_item = Product_Seller.objects.get(product=product, seller=seller)
        product_seller_item.count = product_seller_item.count - 1
        price = Prices.objects.get(user=seller, product_id=product)
        amount += price.price
        newOrder = Orders.objects.create()
        newOrder.order_id = order_id
        newOrder.product = product
        newOrder.seller = seller
        newOrder.buyer = request.user
        newOrder.item_price = price.price
        newOrder.save()
        print(newOrder)

    url = "https://api.razorpay.com/v1/payment_links"

    payload = json.dumps(
        {
            "amount": amount,
            "currency": "INR",
            "accept_partial": True,
            "first_min_partial_amount": 100,
            "expire_by": 1691097057,
            "reference_id": order_id,
            "description": "Payment for policy no #23456",
            "customer": {
                "name": request.user.first_name + " " + request.user.last_name,
                "contact": request.user.phone,
                "email": request.user.email,
            },
            "notify": {"sms": True, "email": True},
            "reminder_enable": True,
            "callback_url": "http://127.0.0.1:8000/products/api/product/orderConfirm/",
            "callback_method": "get",
        }
    )
    headers = {
        "Authorization": "Basic cnpwX3Rlc3RfdkVxSHRPaDllY1dudWM6RmNOUmk3WmRPdk1ydWNxTlZ4dmVVTTE2",
        "Content-Type": "application/json",
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    dict_responce = json.loads(response.text)
    print(dict_responce["short_url"])
    return Response(
        {
            "payment_url": dict_responce["short_url"],
        }
    )


@api_view(["POST"])
def OrderHistory(request):
    print(request.data)
    orders = Orders.objects.filter(buyer=request.user).order_by("-created_at")
    serializer = OrderHistorySerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def OrderConfirm(request):
    print(request.data)
    order_id = request.query_params["razorpay_payment_link_reference_id"]
    print(order_id)
    orders = Orders.objects.filter(order_id=order_id)

    for order in orders:
        order.order_status = "confirmed"
        order.save()

    return HttpResponseRedirect("http://127.0.0.1:3000/orderhistory")


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/getCategories/",
        "/api/allProducts/",
        "api/product/?product_id=xxx",
        "api/product/sellers/?product_id=xxx",
        "api/product/wishlist/",
        "api/product/wishlistItems/",
        "api/product/cart/",
        "api/product/cartItems/",
        "api/product/order/",
        "api/product/orderHistory/",
    ]

    return Response(routes)
