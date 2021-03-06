# Generated by Django 2.0 on 2018-01-18 01:39

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Ecocase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('category', models.ManyToManyField(to='ecocases.Category')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ecocase2ESM',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.IntegerField(default=0)),
                ('ecocase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecocases.Ecocase')),
            ],
        ),
        migrations.CreateModel(
            name='EcocaseRating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.PositiveIntegerField()),
                ('username', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(1)])),
                ('ecocase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecocases.Ecocase')),
            ],
        ),
        migrations.CreateModel(
            name='ESM',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(default='', max_length=50)),
                ('title', models.CharField(default='', max_length=100)),
                ('description', models.CharField(default='', max_length=500)),
            ],
        ),
        migrations.AddField(
            model_name='ecocase2esm',
            name='esm',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecocases.ESM'),
        ),
    ]
