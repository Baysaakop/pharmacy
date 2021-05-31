from django.contrib import admin
from .models import Company, Category, Tag, Item, Favorite, CartItem, Cart, Post

admin.site.register(Company)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Item)
admin.site.register(Favorite)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Post)
