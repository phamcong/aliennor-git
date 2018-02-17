from django.contrib import admin
from .models import Ecocase, EcocaseRating, EcocaseComment, ESM, Association, Category, Level, EcocaseImage, Evaluation, Question
# Register your models here.

class AssociationInline(admin.TabularInline):
  model = Association
  extra = 0

class EcocaseImageInline(admin.TabularInline):
  model = EcocaseImage
  extra = 0

class EcocaseInline(admin.TabularInline):
  model = Ecocase
  extra = 0

class EvaluationInline(admin.TabularInline):
  model = Evaluation
  extra = 0

class EcocaseAdmin(admin.ModelAdmin):
  inlines = [AssociationInline, EcocaseImageInline]

class AssociationAdmin(admin.ModelAdmin):
  inlines = [EvaluationInline]

admin.site.register(Ecocase, EcocaseAdmin)
admin.site.register(EcocaseRating)
admin.site.register(EcocaseComment)
admin.site.register(ESM)
admin.site.register(Association, AssociationAdmin)
admin.site.register(Category)
admin.site.register(Level)
admin.site.register(EcocaseImage)
admin.site.register(Evaluation)
admin.site.register(Question)