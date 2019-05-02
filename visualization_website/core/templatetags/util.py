from django import template

register = template.Library()

@register.filter
def contains_word(var, arg):
    return arg in var
