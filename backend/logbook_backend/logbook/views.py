from django.shortcuts import render
from rest_framework import viewsets
from .models import VisitEntries
from .serializers import VisitEntriesSerializer

class VisitEntriesViewSet(viewsets.ModelViewSet):
    queryset = VisitEntries.objects.all()
    serializer_class = VisitEntriesSerializer