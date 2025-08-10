from django.shortcuts import render
from rest_framework import viewsets
from .models import VisitEntries
from .serializers import VisitEntriesSerializer
from django.utils.dateparse import parse_datetime
from datetime import datetime, time, timedelta
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class VisitEntriesViewSet(viewsets.ModelViewSet):
    queryset = VisitEntries.objects.all()
    serializer_class = VisitEntriesSerializer

    def get_queryset(self):
        date_str = self.request.query_params.get('date')
        if date_str:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            start = timezone.make_aware(datetime.combine(date_obj, time.min))
            end = timezone.make_aware(datetime.combine(date_obj, time.max))
            return VisitEntries.objects.filter(date__range=(start, end)).order_by('-id')
        return super().get_queryset()
    
    @action(detail=False, methods=['POST'])
    def add_entry(self, request):
        serializer = VisitEntriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['DELETE'])
    def delete_entry(self, request, pk=None):
        try:
            entry = VisitEntries.objects.get(pk=pk)
            entry.delete()
            return Response({'detail': 'Entry deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except VisitEntries.DoesNotExist:
            return Response({'detail': 'Entry not found.'}, status=status.HTTP_404_NOT_FOUND)