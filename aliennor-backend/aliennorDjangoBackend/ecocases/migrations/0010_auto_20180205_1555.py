# Generated by Django 2.0 on 2018-02-05 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecocases', '0009_auto_20180204_0107'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Label',
            new_name='Level',
        ),
        migrations.RenameField(
            model_name='ecocase',
            old_name='label',
            new_name='level',
        ),
        migrations.AddField(
            model_name='ecocase',
            name='associated_esms',
            field=models.ManyToManyField(to='ecocases.ESM'),
        ),
    ]
