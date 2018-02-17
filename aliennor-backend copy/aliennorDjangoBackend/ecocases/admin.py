from django.contrib import admin
from .models import Ecocase, EcocaseRating, EcocaseComment, ESM, Ecocase2ESM
# Register your models here.

class Ecocase2ESMInline(admin.TabularInline):
  model = Ecocase2ESM
  extra = 0

class EcocaseAdmin(admin.ModelAdmin):
  inlines = [Ecocase2ESMInline]

admin.site.register(Ecocase, EcocaseAdmin)
admin.site.register(EcocaseRating)
admin.site.register(EcocaseComment)
admin.site.register(ESM)
admin.site.register(Ecocase2ESM)