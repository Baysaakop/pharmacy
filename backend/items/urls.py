from .views import CompanyViewSet, CategoryViewSet, TagViewSet, ItemViewSet, FavoriteViewSet, CartItemViewSet, CartViewSet, PostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='companies')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'items', ItemViewSet, basename='items')
router.register(r'favorites', FavoriteViewSet, basename='favorites')
router.register(r'cartitems', CartItemViewSet, basename='cartitems')
router.register(r'carts', CartViewSet, basename='carts')
router.register(r'posts', PostViewSet, basename='posts')
urlpatterns = router.urls
