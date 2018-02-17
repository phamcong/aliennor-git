from django.http import JsonResponse
from django.db.models import Avg, Count, Func
from django.shortcuts import render
from django.views.generic.edit import FormView
from rest_framework import viewsets

from django.urls import reverse_lazy

from ..forms import EcoCaseForm
from ..models import Ecocase, EcocaseRating, ESM
from django.contrib.auth.models import User
from ..serializers import UserSerializer, EcocaseSerializer
from ..mixins import FormUserNeededMixin, UserOwnerMixin

import json
from ecocases.utils import get_token_data

from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers

def get_esms(request):
    print("at esms view: get esm");
    if request.method != 'GET':
        pass
    
    # get esms
    all_esms = ESM.objects.all().values()
    
    esms = {}
    for esm in list(all_esms):
        esms[esm.get('id')] = esm

    return JsonResponse({
        'status': 'success',
        'data': {
            'esms': esms
        }
    })