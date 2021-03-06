# Generated by Django 2.0 on 2018-02-02 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecocases', '0003_auto_20180202_1148'),
    ]

    operations = [
        migrations.CreateModel(
            name='EcocaseImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prefix', models.CharField(default='', max_length=200)),
                ('image', models.ImageField(default='ecocases/images/no-image.jpg', upload_to='ecocases/images/')),
            ],
        ),
        migrations.AddField(
            model_name='ecocase',
            name='image',
            field=models.ManyToManyField(to='ecocases.EcocaseImage'),
        ),
    ]
