from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils.pg_database import dictfetchall
from .models import Candidat, DiplomeSup, Module, Elementmodule, Passer


def contains_operator(string):
    ops = ('=', '<', '>', '<=', '>=', 'in')
    return string.startswith(ops)


def remove_operator(string):
    ops = ('=', '<', '>', '<=', '>=', 'in')
    if string[:2] in ops:
        return string[2:]

    else:
        return string[1:]


def create_sql_candidats(columns, filters):
    select_cols = ''.join(','.join(col for col in columns))
    sql = "SELECT " + select_cols + (',' if len(columns) != 0 else '') \
          + " COUNT(codecandidat) as count FROM donneescandidat() " + \
          ('' if len(filters) == 0 else "WHERE "
                                        + ''.join(' AND '.join(k + v if contains_operator(v)
                                                               else k + " ILIKE '%" + v + "%'" for k, v in
                                                               filters.items())))
    sql += " GROUP BY " + select_cols if len(columns) != 0 else ''

    sql += " ORDER BY " + ','.join(col for col in columns) if len(columns) != 0 else ''

    return sql


def create_aggregation_sql(columns, filters, count_column, table, op, join_to_candidat):
    select_cols = ','.join(columns)
    alias = count_column.split('.')
    alias = alias[1] if len(alias) == 2 else alias[0]

    sql = "SELECT " + select_cols + (',' if len(columns) != 0 else '')
    if op == 'count':
        sql += 'COUNT(DISTINCT ' + count_column + ') as ' + alias
    elif op == 'avg':
        sql += 'AVG(' + count_column + ') as ' + alias
    elif op == 'max':
        sql += 'MAX(' + count_column + ') as ' + alias
    else:
        sql += count_column

    sql += " FROM " + table
    if join_to_candidat:
        sql += ' INNER JOIN donneescandidat() don on ' + table + '.codecandidat=don.codecandidat '
    sql += ('' if len(filters) == 0 else " WHERE "
                                         + ''.join(' AND '.join(k + v if contains_operator(v)
                                                                else k + " ILIKE '%" + v + "%' " for k, v in
                                                                filters.items())))
    if op in ('count', 'avg', 'max', 'min') and columns != '':
        sql += " GROUP BY " + select_cols
    if columns != '':
        sql += " ORDER BY " + ','.join(columns) if len(columns) != 0 else ''
    return sql


def format_data(result, key):
    values = []
    counts = []

    for data in result:
        counts.append(data[key])
        val = ', '.join(str(v) if v is not None else 'null' for k, v in data.items() if k != key)
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
            sql = create_aggregation_sql(columns, filters, count_column, 'donneescandidat()', 'count', False)
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
        'moysemestre': {'col': 'moyennesemestre', 'table': 'resultatsemestre'},
        'moyformation': {'col': 'moyenneformation', 'table': 'candidat_diplome_sup'}

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
        elconcours = [el['libelle'] for el in Passer.objects.all().values('libelle').distinct().order_by('libelle')]

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
        modules = Module.objects.all().values('codemodule', 'libellemodule').distinct()
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
        join = table + ' ' + table_alias + ' INNER JOIN donneescandidat() c ON ' + table_alias + '.codecandidat = c.codecandidat '

        sql = create_aggregation_sql(['anneecandidature'], filters, column, join, op, False)

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


class RapportCandidat(APIView):

    def post(self, request):
        flt = request.data['filters']
        fields = request.data['fields']

        filters = {}
        if len(flt) != 0:
            for k in flt.keys():
                key = 'don.{}'.format(k)
                filters[key] = flt[k]

        return_data = {}

        sql = create_aggregation_sql('', {}, 'codecandidat', 'candidats', 'count', False)

        cursor = connection.cursor()
        cursor.execute(sql)

        nb_candidats = dictfetchall(cursor)

        return_data['nb_candidats'] = nb_candidats[0]['codecandidat']

        filters_string = create_filters(filters)

        if 'moyformation' in fields:
            col = get_table_data('moyformation')['col']
            table = get_table_data('moyformation')['table']

            sql = create_aggregation_sql('', filters, col, table, 'avg', True)

            cursor.execute(sql)
            res = dictfetchall(cursor)
            moyformation = res[0][col]
            return_data['moyformation'] = moyformation

        if 'excel' in fields:
            col = get_table_data('excel')['col']
            table = get_table_data('excel')['table']

            sql = create_aggregation_sql('', filters, col, table, 'avg', True)

            cursor.execute(sql)
            res = dictfetchall(cursor)
            excel = res[0][col]
            return_data['excel'] = excel

        if 'mentionbac' in fields:
            sql = create_aggregation_sql(['mentionbac'], filters, 'codecandidat', 'donneescandidat() don', 'count', False)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            data, labels = format_data(res, 'mentionbac')
            return_data['mentionbac'] = {'labels': labels, 'data': data}

        if 'typebac' in fields:
            sql = create_aggregation_sql(['typebac'], filters, 'codecandidat', 'donneescandidat() don', 'count', False)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            data, labels = format_data(res, 'typebac')
            return_data['typebac'] = {'labels': labels, 'data': data}

        if 'selmoyformation' in fields:
            col = get_table_data('moyformation')['col']
            sql = "SELECT avg({}) as {} FROM candidat_diplome_sup c " \
                  "INNER JOIN donneescandidat() don ON don.codecandidat=c.codecandidat " \
                  "INNER JOIN estselectionne es ON es.codecandidat=c.codecandidat".format(col, col)
            sql += filters_string

            cursor.execute(sql)
            res = dictfetchall(cursor)
            moyformation = res[0][col]
            return_data['selmoyformation'] = moyformation

        if 'selexcel' in fields:
            col = get_table_data('excel')['col']

            sql = "SELECT avg({}) as {} FROM calculermoyenne c " \
                  "INNER JOIN donneescandidat() don ON don.codecandidat=c.codecandidat " \
                  "INNER JOIN estselectionne es ON es.codecandidat=c.codecandidat".format(col, col)

            sql += filters_string

            cursor.execute(sql)
            res = dictfetchall(cursor)
            excel = res[0][col]
            return_data['selexcel'] = excel

        if 'selmentionbac' in fields:
            sql = create_aggregation_sql(['mentionbac'], filters, 'estselectionne.codecandidat', 'estselectionne', 'count', True)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            data, labels = format_data(res, 'mentionbac')
            return_data['selmentionbac'] = {'labels': labels, 'data': data}

        if 'seltypebac' in fields:
            sql = create_aggregation_sql(['typebac'], filters, 'estselectionne.codecandidat', 'estselectionne', 'count', True)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            data, labels = format_data(res, 'typebac')
            return_data['seltypebac'] = {'labels': labels, 'data': data}

        if 'modules' in request.data and len(request.data['modules']) != 0:
            modules = request.data['modules']
            flt = filters.copy()
            flt['m.codemodule '] = ('in ' + str(tuple(modules)) if len(modules) > 1 else modules[0])

            del flt['don.anneecandidature']
            sql = "SELECT avg(notemodule) as nb, libellemodule, anneecandidature " \
                  "FROM obtenirmodule o INNER JOIN donneescandidat() don on don.codecandidat=o.codecandidat " \
                  "INNER JOIN module m ON o.codemodule=m.codemodule "
            sql += create_filters(flt)
            sql += " GROUP BY libellemodule, anneecandidature ORDER BY libellemodule, anneecandidature"
            print(sql)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            labels, data = format_data(res, 'nb')

            return_data['moduleannee'] = {'labels': labels, 'data': data}

        if 'diplomeannee' in fields:
            sql = create_aggregation_sql(['anneecandidature'], filters, 'mentionannee', 'resultatannee', 'count', True)
            cursor.execute(sql)
            res = dictfetchall(cursor)
            data, labels = format_data(res, 'mentionannee')
            return_data['moduleannee'] = {'labels': labels, 'data': data}

        sql = "SELECT count(don.codecandidat) as nb from donneescandidat() don "
        sql += create_filters(filters)

        cursor.execute(sql)

        res = dictfetchall(cursor)

        candidats_preinscrits = res[0]['nb']
        return_data['preinscrit'] = candidats_preinscrits

        sql = create_generic_count_sql('codecandidat', 'estselectionne', 'donneescandidat()')
        sql += filters_string
        cursor.execute(sql)
        res = dictfetchall(cursor)
        candidats_selectionne = res[0]['nb']
        return_data['preselect'] = candidats_selectionne

        sql = create_generic_count_sql('codecandidat', 'resultat', 'donneescandidat()')
        sql += filters_string
        cursor.execute(sql)
        res = dictfetchall(cursor)
        passe_concours = res[0]['nb']
        return_data['passe_concours'] = passe_concours

        sql = create_aggregation_sql(['estadmis.codecandidat'], filters, 'listeadmission', 'estadmis', '', True)
        cursor.execute(sql)
        res = dictfetchall(cursor)

        nb_principal = 0
        nb_attent = 0

        for row in res:

            if row['listeadmission'] == 'p':
                nb_principal += 1

            else:
                nb_attent += 1

        return_data['admis'] = {'nb_principal': nb_principal, 'nb_attent': nb_attent}

        return Response({'result': return_data})


def create_notes_select(column, target_column, target_table):
    sql = "SELECT " + column + ", "
    sql += target_column + ' as ' + target_column
    sql += " FROM modules_candidat() mc " + \
           ' INNER JOIN ' + target_table + ' ON mc.codecandidat = ' + target_table + '.codecandidat'
    return sql


def create_corr_select(column, target_column, target_table):
    sql = "SELECT corr(" + column + ", " + target_column + ") as corr "

    sql += " FROM modules_candidat() mc " + \
           ' INNER JOIN ' + target_table + ' ON mc.codecandidat = ' + target_table + '.codecandidat'

    return sql


def create_sql(column, target_column, table, target_table):
    sql = "SELECT " + table[0] + "." + column + ',' + table[0] + "." + target_column + " as target "
    sql += " FROM " + table + ' ' + table[0] + \
           ' INNER JOIN ' + target_table + " " + target_table[:3] + ' ON ' + table[0] + '.codecandidat = ' \
           + target_table[:3] + '.codecandidat'

    return sql


def create_generic_count_sql(column, table, target_table):
    sql = 'SELECT count(' + table[0] + '.' + column + ') as nb'
    sql += " FROM " + table + ' ' + table[0] + \
           ' INNER JOIN ' + target_table + " " + target_table[:3] + ' ON ' + table[0] + '.codecandidat = ' \
           + target_table[:3] + '.codecandidat'

    return sql


def create_sql_corr(column, target_column, table, target_table):

    sql = "SELECT corr(" + table[0] + "." + column + ", " + target_table[:3] + '.' + target_column + ") as corr "
    sql += " FROM " + table + ' ' + table[0] + \
           ' INNER JOIN ' + target_table + " " + target_table[:3] + ' ON ' + table[0] + '.codecandidat = ' \
           + target_table[:3] + '.codecandidat'

    return sql


def create_filters(filters):
    return ('' if len(filters) == 0 else " WHERE "
                                         + ''.join(' AND '.join(k + v if contains_operator(v)
                                                                else k + " ILIKE '%" + v + "%' " for k, v in
                                                                filters.items())))
