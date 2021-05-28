from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Company, Category, Tag, Item, Favorite, CartItem, Cart, Post
from .serializers import CompanySerializer, CategorySerializer, TagSerializer, ItemSerializer, FavoriteSerializer, CartItemSerializer, CartSerializer, PostSerializer
from rest_framework import viewsets, filters

class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def create(self, request, *args, **kwargs):                
        company = Company.objects.create(
            name=request.data['name']                          
        )            
        if 'description' in request.data:
            company.description=request.data['description']
        if 'image' in request.data:
            company.image=request.data['image'] 
        company.save()
        serializer = CompanySerializer(company)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)    

    def update(self, request, *args, **kwargs):                         
        company = self.get_object()                                 
        if 'name' in request.data:
            company.name=request.data['name']
        if 'description' in request.data:
            company.description=request.data['description']
        if 'image' in request.data:
            company.image=request.data['image'] 
        company.save()
        serializer = CompanySerializer(company)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)       

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = Item.objects.all().order_by('-created_at')
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name).distinct()
        return queryset

    def create(self, request, *args, **kwargs):              
        user = Token.objects.get(key=request.data['token']).user   
        item = Item.objects.create(
            name=request.data['name'],                   
            created_by=user        
        )                      
        if 'description' in request.data:
            item.description=request.data['description']   
        if 'ingredients' in request.data:
            item.ingredients=request.data['ingredients']   
        if 'usage' in request.data:
            item.usage=request.data['usage']   
        if 'caution' in request.data:
            item.caution=request.data['caution']   
        if 'price' in request.data:
            item.price=request.data['price']   
        if 'company' in request.data:
            item.company=Company.objects.filter(id=int(request.data['company']))[0]   
        if 'category' in request.data:
            categories=request.data['category'].split(',')
            for cat in categories:
                item.category.add(Category.objects.filter(id=int(cat))[0])
        if 'tag' in request.data:
            tags=request.data['tag'].split(',')
            for tag in tags:
                item.tag.add(Tag.objects.filter(id=int(tag))[0])
        if 'image' in request.data:
            item.image=request.data['image']  
        item.save()
        serializer = ItemSerializer(item)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):                         
        item = self.get_object()                 
        user = Token.objects.get(key=request.data['token']).user
        item.updated_by=user
        if 'name' in request.data:
            item.name=request.data['name']
        if 'description' in request.data:
            item.description=request.data['description']   
        if 'ingredients' in request.data:
            item.ingredients=request.data['ingredients']   
        if 'usage' in request.data:
            item.usage=request.data['usage']   
        if 'caution' in request.data:
            item.caution=request.data['caution']   
        if 'price' in request.data:
            item.price=float(request.data['price'])   
        if 'company' in request.data:
            item.company=Company.objects.filter(id=int(request.data['company']))[0]   
        if 'category' in request.data:
            categories=request.data['category'].split(',')
            item.category.clear()
            for cat in categories:
                item.category.add(Category.objects.filter(id=int(cat))[0])
        if 'tag' in request.data:
            tags=request.data['tag'].split(',')
            item.tag.clear()
            for tag in tags:
                item.tag.add(Tag.objects.filter(id=int(tag))[0])
        if 'image' in request.data:
            item.image=request.data['image']  
        item.save()
        serializer = ItemSerializer(item)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)       

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    queryset = Favorite.objects.all()

    def get_queryset(self):
        queryset = Favorite.objects.all()
        token = self.request.query_params.get('token', None)
        if token is not None:
            print(token)
            user = Token.objects.get(key=token).user   
            queryset = queryset.filter(user=user).distinct()
        return queryset

    def create(self, request, *args, **kwargs):              
        user = Token.objects.get(key=request.data['token']).user   
        item = Item.objects.get(id=int(request.data['item']))
        favorite = Favorite.objects.create(
            user=user            
        )                      
        favorite.item.add(item)
        favorite.save()
        serializer = FavoriteSerializer(favorite)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):                         
        favorite = self.get_object()                         
        item = Item.objects.get(id=int(request.data['item']))
        if item in favorite.item.all():
            favorite.item.remove(item)
        else:
            favorite.item.add(item)        
        favorite.save()
        serializer = FavoriteSerializer(favorite)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)     

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.order_by('-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    def create(self, request, *args, **kwargs):              
        user = Token.objects.get(key=request.data['token']).user   
        post = Post.objects.create(
            title=request.data['title'],                   
            created_by=user        
        )                      
        if 'content' in request.data:
            post.content=request.data['content']    
        if 'thumbnail' in request.data:
            post.thumbnail=request.data['thumbnail']  
        post.save()
        serializer = PostSerializer(post)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):                         
        post = self.get_object()                 
        user = Token.objects.get(key=request.data['token']).user
        post.updated_by=user
        if 'title' in request.data:
            post.title=request.data['title']
        if 'content' in request.data:
            post.content=request.data['content']
        if 'thumbnail' in request.data:
            post.thumbnail=request.data['thumbnail'] 
        post.save()
        serializer = PostSerializer(post)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)       