from .utils.pg_database import dictfetchall
from .models import Candidat, DiplomeSup, Module, Elementmodule, Passer
from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        print(token.key)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'expiresIn': 7200,
            'username': user.username
        })


def contains_operator(string):
    ops = ('=', '<', '>', '<=', '>=')
    return string.startswith(ops)


def create_sql_candidats(columns, filters):
    select_cols = ''.join(','.join(col for col in columns))
    sql = "SELECT " + select_cols + (',' if len(columns) != 0 else '') \
          + " COUNT(codecandidat) as count FROM donneescandidat() " + \
          ('' if len(filters) == 0 else "WHERE "
                                        + ''.join(' AND '.join(k + v if contains_operator(v)
                                                               else k + " ILIKE '%" + v + "%'" for k, v in
                                                               filters.items())))
    sql += " GROUP BY " + select_cols if len(columns) != 0 else ''

    sql += " ORDER BY " + \
        ','.join(col for col in columns) if len(columns) != 0 else ''

    return sql


def create_aggregation_sql(columns, filters, count_column, table, op):
    select_cols = ','.join(columns)

    sql = "SELECT " + select_cols + (',' if len(columns) != 0 else '')
    if op == 'count':
        sql += 'COUNT(DISTINCT ' + count_column + ') as ' + count_column
    elif op == 'avg':
        sql += 'AVG(' + count_column + ') as ' + count_column
    elif op == 'max':
        sql += 'MAX(' + count_column + ') as ' + count_column
    else:
        sql += count_column + ' as ' + count_column

    sql += " FROM " + table + \
           ('' if len(filters) == 0 else " WHERE "
                                         + ''.join(' AND '.join(k + v if contains_operator(v)
                                                                else k + " ILIKE '%" + v + "%' " for k, v in
                                                                filters.items())))
    if op in ('count', 'avg', 'max', 'min'):

        sql += " GROUP BY " + select_cols
    sql += " ORDER BY " + ','.join(columns) if len(columns) != 0 else ''
    return sql


def format_data(result, key):
    values = []
    counts = []

    for data in result:
        counts.append(data[key])
        val = ', '.join(str(v) if v is not None else 'null' for k,
                        v in data.items() if k != key)
        data.items()
        values.append(val)

    return values, counts


class StatisticView(APIView):

    def post(self, request):
        columns = request.data['selected_columns']
        filters = request.data['filters']

        try:
            count_column = request.data['operation_column']
            columns.remove(count_column)
            sql = create_aggregation_sql(
                columns, filters, count_column, 'donneescandidat()', 'count')
        except Exception as e:
            sql = create_sql_candidats(columns, filters)
            print("Exception: " + str(e))

        cursor = connection.cursor()
        cursor.execute(sql)
        rows = dictfetchall(cursor)

        labels, counts = format_data(rows, 'count')

        return Response(
            {
                'labels': labels,
                'counts': counts
            }
        )


class ModuleStatisticsView(APIView):
    def get(self, request):
        modules = [{'codemodule': module.codemodule, 'libellemodule': module.libellemodule}
                   for module in Module.objects.order_by('codemodule').distinct('codemodule', 'libellemodule')]

        return Response({'modules': modules})

    def post(self, request):
        column = request.data['column']
        target = request.data['target']
        filters = request.data['filters']

        if target == 'moyennesemestre':
            target_table = 'resultatsemestre'
        elif target == 'moyenneannee':
            target_table = 'resultatannee'

        sql = create_notes_select(column, target, target_table)
        sql += create_filters(filters)
        print(sql)
        cursor = connection.cursor()
        cursor.execute(sql)
        rows = dictfetchall(cursor)

        notes = [{'x': row[column], 'y': row[target]} for row in rows]
        sql = create_corr_select(column, target, target_table)

        sql += create_filters(filters)
        cursor = connection.cursor()
        cursor.execute(sql)
        corr = cursor.fetchone()

        return Response({
            'notes': notes,
            'corr': corr
        })


def get_table_data_joined(key):
    tables = {
        'excel': {'col': 'moyenne', 'table': 'calculermoyenne'},
        'concours': {'col': 'moyenneconcours', 'table': 'resultat'},
        'elconcours': {'col': 'note', 'table': 'passer'},
        'moyenneannee': {'col': 'moyenneannee', 'table': 'moyannee_candidat()'},
        'elmodule': {'col': 'note', 'table': 'elements_candidat()'},
        'module': {'col': 'notemodule', 'table': 'modules_candidat2()'},
        'moysemestre': {'col': 'moyennesemestre', 'table': 'resultatsemestre'}
    }

    return tables[key]


def get_table_data(key):
    tables = {
        'excel': {'col': 'moyenne', 'table': 'calculermoyenne'},
        'concours': {'col': 'moyenneconcours', 'table': 'resultat'},
        'elconcours': {'col': 'note', 'table': 'passer'},
        'moyenneannee': {'col': 'moyenneannee', 'table': 'resultatannee'},
        'elmodule': {'col': 'note', 'table': 'obtenirelement'},
        'module': {'col': 'notemodule', 'table': 'obtenirmodule'},
        'moysemestre': {'col': 'moyennesemestre', 'table': 'resultatsemestre'}
    }

    return tables[key]


class PrecandidatStatistics(APIView):

    def get(self, request):
        modules = [{'codemodule': module.codemodule, 'libellemodule': module.libellemodule}
                   for module in Module.objects.order_by('codemodule').distinct('codemodule', 'libellemodule')]

        elmodules = [{'codeelementmodule': element.codeelementmodule,
                      'libelleelementmodule': element.libelleelementmodule} for element
                     in Elementmodule.objects.order_by('codeelementmodule').distinct('codeelementmodule',
                                                                                     'libelleelementmodule')]
        elconcours = [el['libelle'] for el in Passer.objects.all().values(
            'libelle').distinct().order_by('libelle')]

        annees = [el['anneecandidature'] for el in Candidat.objects.exclude(anneecandidature__isnull=True).values(
            'anneecandidature').distinct().order_by('anneecandidature')]

        return Response({
            'modules': modules,
            'elmodules': elmodules,
            'elconcours': elconcours,
            'annees': annees
        })

    def post(self, request):
        column = request.data['column']
        target = request.data['target']
        filters = request.data['filters']

        table = get_table_data_joined(column).get('table')
        column = get_table_data_joined(column).get('col')
        target_table = get_table_data_joined(target).get('table')
        target = get_table_data_joined(target).get('col')

        sql = create_sql(column, target, table, target_table)
        sql += create_filters(filters)
        print(sql)
        cursor = connection.cursor()
        cursor.execute(sql)
        rows = dictfetchall(cursor)

        data = [{'x': row[column], 'y': row['target']} for row in rows]

        sql = create_sql_corr(column, target, table, target_table)
        sql += create_filters(filters)
        cursor = connection.cursor()
        cursor.execute(sql)
        corr = cursor.fetchone()

        return Response({'result': data, 'corr': corr})


class FiltersData(APIView):
    def get(self, request):
        diplomes = DiplomeSup.objects.all().values('libelle').distinct()
        typesbac = Candidat.objects.all().values('typebac').distinct()
        modules = Module.objects.all().values('codemodule', 'libellemodule')
        data = {
            'diplomes': [d['libelle'] for d in diplomes if d['libelle'] is not None],
            'typesbac': [typebac['typebac'] for typebac in typesbac if typebac['typebac'] is not None],
            'modules': modules
        }

        return Response(data)


class NotesStatistic(APIView):
    def post(self, request):
        field = request.data['field']
        filters = request.data['filters']
        op = request.data['op']
        table = get_table_data(field).get('table')
        column = get_table_data(field).get('col')

        table_alias = table[:2]
        join = table + ' ' + table_alias + ' INNER JOIN donneescandidat() c ON ' + \
            table_alias + '.codecandidat = c.codecandidat '

        sql = create_aggregation_sql(
            ['anneecandidature'], filters, column, join, op)

        cursor = connection.cursor()
        cursor.execute(sql)
        rows = dictfetchall(cursor)

        annees = [el['anneecandidature'] for el in Candidat.objects.exclude(anneecandidature__isnull=True)
                  .values('anneecandidature').distinct().order_by('anneecandidature')]

        data = []
        for annee in annees:
            found = False
            for row in rows:
                if annee == row['anneecandidature']:
                    data.append(row[column])
                    found = True
                    break
            if not found:
                data.append(0)

        return Response({'result': data})


def create_notes_select(column, target_column, target_table):
    sql = "SELECT " + column + ", "
    sql += target_column + ' as ' + target_column
    sql += " FROM modules_candidat() mc " + \
           ' INNER JOIN ' + target_table + ' ON mc.codecandidat = ' + \
        target_table + '.codecandidat'

    return sql


def create_corr_select(column, target_column, target_table):
    sql = "SELECT corr(" + column + ", " + target_column + ") as corr "

    sql += " FROM modules_candidat() mc " + \
           ' INNER JOIN ' + target_table + ' ON mc.codecandidat = ' + \
        target_table + '.codecandidat'

    return sql


def create_sql(columns, target_columns, table, target_table):
    sql = "SELECT " + table[0] + "." + columns + ',' + \
        target_table[:2] + "." + target_columns + " as target "
    sql += " FROM " + table + ' ' + table[0] + \
           ' INNER JOIN ' + target_table + " " + target_table[:2] + ' ON ' + table[0] + '.codecandidat = ' \
           + target_table[:2] + '.codecandidat'

    return sql


def create_sql_corr(column, target_column, table, target_table):
    sql = "SELECT corr(" + table[0] + "." + column + ", " + \
        target_table[:2] + '.' + target_column + ") as corr "
    sql += " FROM " + table + ' ' + table[0] + \
           ' INNER JOIN ' + target_table + " " + target_table[:2] + ' ON ' + table[0] + '.codecandidat = ' \
           + target_table[:2] + '.codecandidat'

    return sql


def create_filters(filters):
    return ('' if len(filters) == 0 else " WHERE "

                                         + ''.join(' AND '.join(k + v if contains_operator(v)
                                                                else k + " ILIKE '%" + v + "%' " for k, v in
                                                                filters.items())))
