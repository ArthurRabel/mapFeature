from django.db import models

class MapFeature(models.Model):
    json_feature = models.JSONField()

# Create your models here.
