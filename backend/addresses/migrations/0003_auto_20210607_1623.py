# Generated by Django 3.1.4 on 2021-06-07 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addresses', '0002_auto_20210604_1640'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='section',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.DeleteModel(
            name='Section',
        ),
    ]