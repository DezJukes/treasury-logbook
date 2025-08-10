from django.db import models

# Create your models here.
class VisitEntries(models.Model):
    id = models.AutoField(
        db_column='id',
        primary_key=True,
    )
    student_no = models.BigIntegerField(
        db_column='student_no',
        null=False,
    )
    student_name = models.CharField(
        db_column='student_name',
        null=True,
    )
    purpose = models.TextField(
        db_column='purpose',
        null=True,
    )
    staff = models.CharField(
        db_column='staff',
        null=True,
    )
    date = models.DateTimeField(
        db_column='date',
        auto_now_add=True,
    )
    class Meta:
        managed = False
        db_table = 'visit_entries'