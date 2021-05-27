from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Company, Category, Tag, Item, Favorite, Cart, Post
from users.serializers import UserSerializer

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'image')  

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')     

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'description')       

class ItemSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    category = CategorySerializer(read_only=True, many=True)
    tag = TagSerializer(read_only=True, many=True)
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'ingredients', 'usage', 'caution',
        'company', 'category', 'tag', 'price', 'rating', 'image', 'total', 'created_by', 'updated_by', 'created_at', 'updated_at')        

class FavoriteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    item = ItemSerializer(read_only=True, many=True)
    class Meta:
        model = Favorite
        fields = ('id', 'user', 'item')

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    item = ItemSerializer(read_only=True, many=True)
    class Meta:
        model = Cart
        fields = ('id', 'user', 'item')    

class PostSerializer(serializers.ModelSerializer):       
    class Meta:
        model = Post
        fields = (
            'id', 'title', 'content', 'thumbnail', 'created_at', 'created_by'           
        ) 