from django.db.models import query
from .models import City, District, Section, Address
from .serializers import CitySerializer, DistrictSerializer, SectionSerializer, AddressSerializer
from rest_framework import viewsets

class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()

    def get_queryset(self):
        queryset = District.objects.all()
        city = self.request.query_params.get('city', None)
        if city is not None:
            queryset = queryset.filter(city__id=int(city)).distinct()
        return queryset

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()

    def get_queryset(self):
        queryset = Section.objects.all()
        district = self.request.query_params.get('district', None)
        if district is not None:
            queryset = queryset.filter(district__id=int(district)).distinct()
        return queryset

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def get_queryset(self):
        queryset = Address.objects.all()
        section = self.request.query_params.get('section', None)
        if section is not None:
            queryset = queryset.filter(section__id=int(section)).distinct()
        return queryset
