from django.urls import path

from . import views

app_name = 'core'
urlpatterns = [
    path('', views.StatisticView.as_view(), name='costum_stastics'),
    path('filters/', views.FiltersData.as_view(), name='filters'),
    path('modules/', views.ModuleStatisticsView.as_view(), name='modules')
]
