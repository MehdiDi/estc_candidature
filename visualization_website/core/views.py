from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils.pg_database import dictfetchall
from .models import Candidat, DiplomeSup, Module


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

    sql += " ORDER BY " + ','.join(col for col in columns) if len(columns) != 0 else ''

    return sql


def create_sql(columns, filters, count_column, table, op):
    select_cols = ','.join(columns)

    sql = "SELECT " + select_cols + (',' if len(columns) != 0 else '')
    if op == 'count':
        sql += 'COUNT(DISTINCT ' + count_column + ') as count '
    elif op == 'avg':
        sql += 'AVG(' + count_column + ') as n '
    else:
        sql += count_column + ' as n '

    sql += " FROM " + table + \
            ('' if len(filters) == 0 else "WHERE "
                                                + ''.join(' AND '.join(k + v if contains_operator(v)
                                                               else k + " ILIKE '%" + v + "%' " for k, v in
                                                               filters.items())))
    if op in ('count', 'avg'):
        sql += " GROUP BY " + select_cols
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
            count_column = request.data['count_column']
            columns.remove(count_column)
            sql = create_sql(columns, filters, count_column, 'donneescandidat()', 'count')
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


class EtudiantStatistics(APIView):
    def get(self, request):
        modules = Module.objects.all()
        return Response(modules)

    def post(self, request):
        columns = request.data['selected_columns']
        filters = request.data['filters']

        # Hard coded module to be removed and added to the front end
        operation_column = 'notemodule'

        if len(columns) == 1 and columns[0] == 'codecandidat':
            op = ''

        else:
            op = 'avg'
        #
        sql = create_sql(columns, filters, operation_column, 'notesmodules()', op)

        cursor = connection.cursor()
        cursor.execute(sql)
        rows = dictfetchall(cursor)
        labels, values = format_data(rows, 'n')

        return Response({
            'labels': labels,
            'values': values
        })


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



