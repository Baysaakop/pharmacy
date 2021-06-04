from rest_framework import serializers
from .models import City, District, Section, Address

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')  

class DistrictSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    class Meta:
        model = District
        fields = ('id', 'name', 'city')  

class SectionSerializer(serializers.ModelSerializer):
    district = DistrictSerializer(read_only=True)
    class Meta:
        model = Section
        fields = ('id', 'name', 'district')  

class AddressSerializer(serializers.ModelSerializer):
    section = SectionSerializer(read_only=True)
    class Meta:
        model = Address
        fields = ('id', 'section', 'address')  