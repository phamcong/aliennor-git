from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import User

# Create your models here.
class Ecocase(models.Model):    
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

    def __str__(self):
        return 'Title: ' + self.title

    def save(self, *args, **kwargs):
        # ecocase ID has to be unique (should probably make it a primary key)
        if Ecocase.objects.filter(title=self.title).exists():
            raise ValueError('The ecocase with title %s is already present' % self.title)
        else:
            # save
            super(Ecocase, self).save(*args, **kwargs)

class EcocaseComment(models.Model):
    ecocase = models.ForeignKey(Ecocase, on_delete=models.CASCADE)    
    username = models.CharField(max_length=100, validators=[MinLengthValidator(1)])
    body = models.TextField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body

    def save(self, *args, **kwargs):
        self.full_clean()
        super(EcocaseComment, self).save(*args, **kwargs)

class EcocaseRating(models.Model):
    ecocase = models.ForeignKey(Ecocase, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    username = models.CharField(max_length=100, validators=[MinLengthValidator(1)])

    def __str__(self):
        return 'Title: %s | Vote: %s' % (self.ecocase, self.rating)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(EcocaseRating, self).save(*args, **kwargs)