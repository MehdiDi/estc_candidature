from django.urls import path

from . import views

urlpatterns = [
    path('', views.MLCandidat.as_view()),
]