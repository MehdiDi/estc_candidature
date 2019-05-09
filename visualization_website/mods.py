# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Calculermoyenne(models.Model):
    moyenne = models.FloatField(blank=True, null=True)
    codecandidat = models.ForeignKey('Candidats', models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    anneepreselection = models.ForeignKey('Preselection', models.DO_NOTHING, db_column='anneepreselection', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calculermoyenne'


class CandidatDiplomeSup(models.Model):
    codecandidat = models.ForeignKey('Candidats', models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    codediplome = models.ForeignKey('DiplomeSup', models.DO_NOTHING, db_column='codediplome', blank=True, null=True)
    dureeformation = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'candidat_diplome_sup'


class CandidatPeriode(models.Model):
    codecandidat = models.ForeignKey('Candidats', models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    codeperiode = models.ForeignKey('Periodes', models.DO_NOTHING, db_column='codeperiode', blank=True, null=True)
    periode = models.CharField(max_length=20, blank=True, null=True)
    note = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'candidat_periode'


class Candidats(models.Model):
    codecandidat = models.BigIntegerField(primary_key=True)
    nom = models.CharField(max_length=100, blank=True, null=True)
    prenom = models.CharField(max_length=100, blank=True, null=True)
    genre = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    nationalite = models.CharField(max_length=100, blank=True, null=True)
    adresse = models.CharField(max_length=500, blank=True, null=True)
    typebac = models.CharField(max_length=100, blank=True, null=True)
    mentionbac = models.CharField(max_length=100, blank=True, null=True)
    periodebac = models.CharField(max_length=100, blank=True, null=True)
    anneecandidature = models.BigIntegerField(blank=True, null=True)
    datenaissance = models.DateTimeField(blank=True, null=True)
    cne = models.BigIntegerField(blank=True, null=True)
    naissance = models.ForeignKey('Villes', models.DO_NOTHING, db_column='naissance', blank=True, null=True)
    residence = models.ForeignKey('Villes', models.DO_NOTHING, db_column='residence', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'candidats'


class Comprends(models.Model):
    libelle = models.ForeignKey('Matiere', models.DO_NOTHING, db_column='libelle', blank=True, null=True)
    anneetestecrit = models.ForeignKey('Testecrit', models.DO_NOTHING, db_column='anneetestecrit', blank=True, null=True)
    bareme = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comprends'


class Deliberationconcours(models.Model):
    anneedeliberation = models.BigIntegerField(primary_key=True)
    datedeliberation = models.DateField(blank=True, null=True)
    coefconcours = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'deliberationconcours'


class Deliberationfiliere(models.Model):
    anneedelib = models.BigIntegerField(primary_key=True)
    datedelib = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'deliberationfiliere'


class Deliberer(models.Model):
    anneedeliberation = models.ForeignKey(Deliberationconcours, models.DO_NOTHING, db_column='anneedeliberation', blank=True, null=True)
    codeenseignant = models.ForeignKey('Enseignant', models.DO_NOTHING, db_column='codeenseignant', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'deliberer'


class Deposerdossier(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    anneeetudedossier = models.ForeignKey('Etudedossier', models.DO_NOTHING, db_column='anneeetudedossier', blank=True, null=True)
    resultatetude = models.CharField(max_length=1000, blank=True, null=True)
    remarque = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'deposerdossier'


class DiplomeSup(models.Model):
    codediplome = models.BigIntegerField(primary_key=True)
    libelle = models.CharField(max_length=100, blank=True, null=True)
    etablissement = models.CharField(max_length=100, blank=True, null=True)
    ville = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diplome_sup'


class Elementmodule(models.Model):
    libelleelementmodule = models.CharField(max_length=100, blank=True, null=True)
    coefficientelement = models.BigIntegerField(blank=True, null=True)
    codemodule = models.ForeignKey('Module', models.DO_NOTHING, db_column='codemodule', primary_key=True)
    codeelementmodule = models.CharField(max_length=20)
    codefiliere = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'elementmodule'
        unique_together = (('codemodule', 'codeelementmodule', 'codefiliere'),)


class Enseignant(models.Model):
    codeenseignant = models.BigIntegerField(primary_key=True)
    nomenseignant = models.CharField(max_length=100, blank=True, null=True)
    prenomenseignant = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'enseignant'


class Estadmis(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    anneedeliberation = models.ForeignKey(Deliberationconcours, models.DO_NOTHING, db_column='anneedeliberation', blank=True, null=True)
    listeadmission = models.CharField(max_length=100, blank=True, null=True)
    ordre = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estadmis'


class Estselectionne(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    anneepreselection = models.ForeignKey('Preselection', models.DO_NOTHING, db_column='anneepreselection', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estselectionne'


class Etudedossier(models.Model):
    anneeetudedossier = models.BigIntegerField(primary_key=True)
    datedebutdepot = models.BigIntegerField(blank=True, null=True)
    datefindepot = models.BigIntegerField(blank=True, null=True)
    dateetude = models.DateField(blank=True, null=True)
    dureeetudeenjours = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'etudedossier'


class Etudier(models.Model):
    anneeetudedossier = models.ForeignKey(Etudedossier, models.DO_NOTHING, db_column='anneeetudedossier', blank=True, null=True)
    codeenseignant = models.ForeignKey(Enseignant, models.DO_NOTHING, db_column='codeenseignant', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'etudier'


class Filiere(models.Model):
    codefiliere = models.CharField(primary_key=True, max_length=100)
    dateaccreditation = models.DateField(blank=True, null=True)
    dureeaccreditation = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'filiere'


class Globale(models.Model):
    codecandidat = models.BigIntegerField(blank=True, null=True)
    promotion = models.BigIntegerField(blank=True, null=True)
    cne = models.CharField(max_length=100, blank=True, null=True)
    nom = models.CharField(max_length=140, blank=True, null=True)
    prenom = models.CharField(max_length=19, blank=True, null=True)
    filiere_etat = models.CharField(max_length=20, blank=True, null=True)
    filiere_mention = models.CharField(max_length=10, blank=True, null=True)
    filiere_moy = models.DecimalField(max_digits=9, decimal_places=3, blank=True, null=True)
    filiere_rang = models.BigIntegerField(blank=True, null=True)
    s5_etat = models.CharField(max_length=20, blank=True, null=True)
    s5_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m01_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m01_etat = models.CharField(max_length=2, blank=True, null=True)
    m01_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m01a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m01b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m02_etat_ar = models.CharField(max_length=1, blank=True, null=True)
    m02_etat = models.CharField(max_length=20, blank=True, null=True)
    m02_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m02a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m02b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m03_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m03_etat = models.CharField(max_length=20, blank=True, null=True)
    m03_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m03a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m03b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m04_etat_ar = models.CharField(max_length=1, blank=True, null=True)
    m04_etat = models.CharField(max_length=20, blank=True, null=True)
    m04_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m04a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m04b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m05_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m05_etat = models.CharField(max_length=20, blank=True, null=True)
    m05_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m05a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m05b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m06_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m06_etat = models.CharField(max_length=20, blank=True, null=True)
    m06_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m06a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m06b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    s6_etat = models.CharField(max_length=2, blank=True, null=True)
    s6_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m07_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m07_etat = models.CharField(max_length=20, blank=True, null=True)
    m07_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m07a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m07b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m08_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m08_etat = models.CharField(max_length=20, blank=True, null=True)
    m08_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m08a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m08b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m09_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    m09_etat = models.CharField(max_length=20, blank=True, null=True)
    m09_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m09a_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    m09b_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    sfe_etat_ar = models.CharField(max_length=10, blank=True, null=True)
    sfe_etat = models.CharField(max_length=2, blank=True, null=True)
    sfe_moy = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    sfe_tvr = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    sfe_rap = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    sfe_exp = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'globale'


class Matiere(models.Model):
    libelle = models.CharField(primary_key=True, max_length=100)
    nommatiere = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'matiere'


class Module(models.Model):
    codemodule = models.CharField(primary_key=True, max_length=50)
    libellemodule = models.CharField(max_length=100, blank=True, null=True)
    codefiliere = models.ForeignKey(Filiere, models.DO_NOTHING, db_column='codefiliere')
    idsemestre = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'module'
        unique_together = (('codemodule', 'codefiliere'),)


class Obtenirelement(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat')
    idsession = models.IntegerField()
    note = models.FloatField(blank=True, null=True)
    codeelementmodule = models.ForeignKey(Elementmodule, models.DO_NOTHING, db_column='codeelementmodule', blank=True, null=True)
    codemodule = models.CharField(max_length=20, blank=True, null=True)
    codefiliere = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'obtenirelement'


class Obtenirmodule(models.Model):
    codemodule = models.ForeignKey(Module, models.DO_NOTHING, db_column='codemodule', primary_key=True)
    idsession = models.IntegerField()
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat')
    notemodule = models.FloatField(blank=True, null=True)
    etatmodule = models.CharField(max_length=20, blank=True, null=True)
    codefiliere = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'obtenirmodule'
        unique_together = (('codemodule', 'idsession', 'codecandidat'),)


class Parametresformulepreselection(models.Model):
    libelleparametre = models.CharField(primary_key=True, max_length=1000)

    class Meta:
        managed = False
        db_table = 'parametresformulepreselection'


class Participer(models.Model):
    anneepreselection = models.ForeignKey('Preselection', models.DO_NOTHING, db_column='anneepreselection', blank=True, null=True)
    codeenseignant = models.ForeignKey(Enseignant, models.DO_NOTHING, db_column='codeenseignant', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'participer'


class Passer(models.Model):
    codecandidat = models.BigIntegerField(blank=True, null=True)
    anneetestecrit = models.BigIntegerField(blank=True, null=True)
    libelle = models.CharField(max_length=100, blank=True, null=True)
    note = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'passer'


class Periodes(models.Model):
    codeperiode = models.CharField(primary_key=True, max_length=100)
    intitule = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'periodes'


class Preselection(models.Model):
    anneepreselection = models.BigIntegerField(primary_key=True)
    dateselection = models.DateField(blank=True, null=True)
    effectifpreselectionnee = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'preselection'


class Quoter1(models.Model):
    pourcentagequota1 = models.FloatField(blank=True, null=True)
    anneepreselection = models.ForeignKey(Preselection, models.DO_NOTHING, db_column='anneepreselection', blank=True, null=True)
    codediplome = models.ForeignKey(DiplomeSup, models.DO_NOTHING, db_column='codediplome', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'quoter1'


class Quoter2(models.Model):
    anneedeliberation = models.ForeignKey(Deliberationconcours, models.DO_NOTHING, db_column='anneedeliberation', blank=True, null=True)
    codediplome = models.ForeignKey(DiplomeSup, models.DO_NOTHING, db_column='codediplome', blank=True, null=True)
    pourcentagequota2 = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'quoter2'


class Resultat(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', blank=True, null=True)
    anneedeliberation = models.ForeignKey(Deliberationconcours, models.DO_NOTHING, db_column='anneedeliberation', blank=True, null=True)
    moyenneconcours = models.FloatField(blank=True, null=True)
    moyenneglobale = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resultat'


class Resultatannee(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', primary_key=True)
    anneedelib = models.ForeignKey(Deliberationfiliere, models.DO_NOTHING, db_column='anneedelib')
    moyenneannee = models.FloatField(blank=True, null=True)
    mentionannee = models.CharField(max_length=100, blank=True, null=True)
    rang = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resultatannee'
        unique_together = (('codecandidat', 'anneedelib'),)


class Resultatsemestre(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat', primary_key=True)
    idsemestre = models.ForeignKey('Semestre', models.DO_NOTHING, db_column='idsemestre')
    idsession = models.IntegerField()
    moyennesemestre = models.FloatField(blank=True, null=True)
    etatsemestre = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resultatsemestre'
        unique_together = (('codecandidat', 'idsemestre', 'idsession'),)


class Semestre(models.Model):
    idsemestre = models.CharField(primary_key=True, max_length=20)
    libellesemestre = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'semestre'


class Session(models.Model):
    idsession = models.IntegerField(primary_key=True)
    libellesession = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'session'


class Telephones(models.Model):
    codecandidat = models.ForeignKey(Candidats, models.DO_NOTHING, db_column='codecandidat')
    numtel = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telephones'


class Testecrit(models.Model):
    anneetestecrit = models.BigIntegerField(primary_key=True)
    datetest = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'testecrit'


class Utiliser(models.Model):
    libelleparametre = models.ForeignKey(Parametresformulepreselection, models.DO_NOTHING, db_column='libelleparametre', blank=True, null=True)
    anneepreselection = models.ForeignKey(Preselection, models.DO_NOTHING, db_column='anneepreselection', blank=True, null=True)
    coefficient = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'utiliser'


class Villes(models.Model):
    idville = models.BigIntegerField(primary_key=True)
    nomville = models.CharField(max_length=52, blank=True, null=True)
    pays = models.CharField(max_length=52, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'villes'
