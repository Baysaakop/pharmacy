from .models import Profile
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from .models import Profile, CartItem, Order
from .serializers import UserSerializer, ProfileSerializer, CartItemSerializer, OrderSerializer
from rest_framework import viewsets
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.account.adapter import get_adapter
from addresses.models import Address, City, District

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def update(self, request, *args, **kwargs):            
        profile = self.get_object()        
        user = profile.user          
        if 'username' in request.data:            
            user.username=request.data['username']                                     
        if 'first_name' in request.data:
            user.first_name=request.data['first_name']                      
        if 'last_name' in request.data:
            user.last_name=request.data['last_name']                      
        if 'phone_number' in request.data:
            profile.phone_number=request.data['phone_number']    
        if 'birth_date' in request.data:
            profile.birth_date=request.data['birth_date']                       
        if 'address' in request.data:
            if profile.address is None:                
                address=Address.objects.create(
                    city=City.objects.get(id=int(request.data['city'])),
                    district=District.objects.get(id=int(request.data['district'])),
                    section=request.data['section'],
                    address=request.data['address']
                )
                profile.address=address
            else:
                if profile.address.city.id != int(request.data['city']):
                    profile.address.city=City.objects.get(id=int(request.data['city']))
                if profile.address.district.id != int(request.data['district']):
                    profile.address.district=District.objects.get(id=int(request.data['district']))
                if profile.address.section != request.data['section']:
                    profile.address.section=request.data['section']
                if profile.address.address != request.data['address']:
                    profile.address.address=request.data['address']  
        profile.save()
        user.save()
        serializer = ProfileSerializer(profile)
        headers = self.get_success_headers(serializer.data)        
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()    

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    callback_url = 'http://localhost:3000/'
    client_class = OAuth2Client

    def process_login(self):        
        get_adapter(self.request).login(self.request, self.user)
