from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VisitEntriesViewSet

router = DefaultRouter()

router.register(r'visitentries', VisitEntriesViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]