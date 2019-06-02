from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

from . import views

app_name = 'core'
urlpatterns = [
    path('', views.StatisticView.as_view(), name='costum_stastics'),
    path('filters/', views.FiltersData.as_view(), name='filters'),
    path('modules/', views.ModuleStatisticsView.as_view(), name='modules'),
    path('preselect/', views.PrecandidatStatistics.as_view(), name='preselect'),
<<<<<<< HEAD
    path('api/token/', views.CustomAuthToken.as_view(), name="api-token"),
    path('notes/', views.NotesStatistic.as_view(), name='notes')

=======
    path('notes/', views.NotesStatistic.as_view(), name='notes'),
    path('rapport/', views.RapportCandidat.as_view(), name='rapport'),
    path('predict/', views.PredictCandidats.as_view(), name='predict'),
    path('api/token/', views.CustomAuthToken.as_view(), name="api-token"),
>>>>>>> master
]
