# Generated by Django 2.0 on 2018-02-27 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecocases', '0016_auto_20180227_1337'),
    ]

    operations = [
        migrations.AddField(
            model_name='esm',
            name='image_url',
            field=models.CharField(default='', max_length=500, null=True),
        ),
    ]
