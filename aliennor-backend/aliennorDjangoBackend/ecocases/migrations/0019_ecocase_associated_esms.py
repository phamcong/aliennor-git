# Generated by Django 2.0 on 2018-02-28 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecocases', '0018_remove_ecocase_associated_esms'),
    ]

    operations = [
        migrations.AddField(
            model_name='ecocase',
            name='associated_esms',
            field=models.ManyToManyField(to='ecocases.ESM'),
        ),
    ]
