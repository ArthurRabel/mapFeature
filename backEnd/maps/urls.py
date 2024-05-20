from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('mapfeature/', TemplateView.as_view(template_name='index.html')),
]