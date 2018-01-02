from django.contrib import admin
from .models import Ecocase, EcocaseRating, EcocaseComment
# Register your models here.
admin.site.register(Ecocase)
admin.site.register(EcocaseRating)
admin.site.register(EcocaseComment)