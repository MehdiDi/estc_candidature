
# Generated by Django 2.2.1 on 2019-05-11 16:21


from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Candidat',
            fields=[
                ('codecandidat', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nom', models.CharField(blank=True, max_length=100, null=True)),
                ('prenom', models.CharField(blank=True, max_length=100, null=True)),
                ('genre', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('nationalite', models.CharField(blank=True, max_length=100, null=True)),
                ('adresse', models.CharField(blank=True, max_length=500, null=True)),
                ('typebac', models.CharField(blank=True, max_length=100, null=True)),
                ('mentionbac', models.CharField(blank=True, max_length=100, null=True)),
                ('periodebac', models.CharField(blank=True, max_length=100, null=True)),
                ('anneecandidature', models.BigIntegerField(blank=True, null=True)),
                ('datenaissance', models.DateTimeField(blank=True, null=True)),
                ('cne', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'candidats',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CandidatDiplomeSup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dureeformation', models.CharField(blank=True, max_length=500, null=True)),
            ],
            options={
                'db_table': 'candidat_diplome_sup',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CandidatPeriode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('periode', models.CharField(blank=True, max_length=20, null=True)),
                ('note', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'candidat_periode',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DiplomeSup',
            fields=[
                ('codediplome', models.BigIntegerField(primary_key=True, serialize=False)),
                ('libelle', models.CharField(blank=True, max_length=100, null=True)),
                ('etablissement', models.CharField(blank=True, max_length=100, null=True)),
                ('ville', models.CharField(blank=True, max_length=25, null=True)),
            ],
            options={
                'db_table': 'diplome_sup',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Elementmodule',
            fields=[
                ('libelleelementmodule', models.CharField(blank=True, max_length=100, null=True)),
                ('coefficientelement', models.BigIntegerField(blank=True, null=True)),
                ('codeelementmodule', models.CharField(max_length=20, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'elementmodule',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Filiere',
            fields=[
                ('codefiliere', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('dateaccreditation', models.DateField(blank=True, null=True)),
                ('dureeaccreditation', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'filiere',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('codemodule', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('libellemodule', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'module',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Passer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('anneetestecrit', models.BigIntegerField(blank=True, null=True)),
                ('libelle', models.CharField(blank=True, max_length=100, null=True)),
                ('note', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'passer',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Periode',
            fields=[
                ('codeperiode', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('intitule', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'periodes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Semestre',
            fields=[
                ('idsemestre', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('libellesemestre', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'semestre',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Telephone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numtel', models.CharField(blank=True, max_length=25, null=True)),
            ],
            options={
                'db_table': 'telephones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ville',
            fields=[
                ('idville', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nomville', models.CharField(blank=True, max_length=100, null=True)),
                ('pays', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'villes',
                'managed': False,
            },
        ),
    ]
