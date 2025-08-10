from rest_framework import serializers
from .models import VisitEntries

class VisitEntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitEntries
        fields = [
            "id",
            "student_no",
            "student_name",
            "purpose",
            "staff",
            "date",
        ]