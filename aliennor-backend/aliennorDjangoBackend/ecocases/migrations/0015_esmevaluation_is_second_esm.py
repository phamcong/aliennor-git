# Generated by Django 2.0 on 2018-02-26 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecocases', '0014_esmevaluation_is_first_esm'),
    ]

    operations = [
        migrations.AddField(
            model_name='esmevaluation',
            name='is_second_esm',
            field=models.NullBooleanField(default=False),
        ),
    ]
