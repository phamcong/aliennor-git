from django.http import JsonResponse
from django.db.models import Avg, Count, Func
from django.shortcuts import render
from django.views.generic.edit import FormView
from rest_framework import viewsets

from django.urls import reverse_lazy

from ..forms import EcoCaseForm
from ..models import Ecocase, EcocaseRating, EcocaseComment
from django.contrib.auth.models import User
from ..serializers import UserSerializer, EcocaseSerializer, EcocaseCommentSerializer
from ..mixins import FormUserNeededMixin, UserOwnerMixin

import json
from ecocases.utils import get_token_data

def indexView(request):
    ecocases = Ecocase.objects.all()
    return render(request, 'ecocases/index.html', {'ecocases': ecocases})

def new_ecocase(request):
    if request.method != 'POST':
        pass

    # get ecocase title
    title = request.POST.get('title', '')

    # save new ecocase
    ecocase = Ecocase(title=title)
    try:
        ecocase.save()
    except Exception as e:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': str(e) if type(e) == ValueError else 'Error while saving ecocase'
            }
        }, status=500)

    return JsonResponse({
        'status': 'success',
        'data': {
            'title': m.title
        }
    })

class EcocaseCreateView(FormUserNeededMixin, FormView):
    form_class = EcoCaseForm
    template_name = 'ecocases/ecocase_create.html'
    success_url = reverse_lazy('ecocases:index')

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        # images = request.FILES.getlist('images')

        if form.is_valid():
            # image_url_list = []

            # for count, image in enumerate(images):
            #     uploaded_image = ecocase_image_fs.save(image.name, image)
            #     image_url_list.append(uploaded_image_path + uploaded_image)

            ecocase = Ecocase(title=form.cleaned_data['title'],                             
                              user=request.user,
                              )
            ecocase.save()
            
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

def post_ecocase(request):
    print("at ecocase views: post ecocase")
    if request.method == 'POST':
        post_data = json.loads(request.body)
        title = post_data['title']

        try:
            username = post_data['username']
        except KeyError:
            token = get_token_data(request)
            username = token['username']

        # get ecocase object
        user = User.objects.get(username=username)
        # comment
        ecocase = Ecocase(title=title, user=user)
        try:
            ecocase.save()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while saving ecocase'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success',
            'data': {
                'id': ecocase.id
            }
        })
    elif request.method == 'DELETE':
        id = request.GET.get('id', '')
        # username = request.GET.get('u', '')

        try:
            ecocase = Ecocase.objects.get(id=id)
        except Ecocase.DoesNotExist:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'This ecocase does not exist'
                }
            }, status=500)

        try:
            ecocase.delete()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while deleting ecocase'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success'
        })

def ecocase_details(request, ecocase_id):
    print('at ecocase detail');
    if request.method != 'GET':
        pass

    # get ecocase
    try:
        ecocase = Ecocase.objects.get(id=ecocase_id)
    except Ecocase.DoesNotExist:
        return JsonResponse({
            'status': 'success',
            'data': {
                'rating': {
                    'avg': None,
                    'comments': None
                }
            }
        })

    # get rating
    r = EcocaseRating.objects.filter(ecocase=ecocase)\
        .values('rating')\
        .aggregate(
            avg_rating=Avg('rating'),
            rating_count=Count('rating')
        )
    avg_rating = r['avg_rating']
    rating_count = r['rating_count']

    # get comments
    cmt = EcocaseComment.objects.filter(ecocase=ecocase).values('body', 'username')

    return JsonResponse({
        'status': 'success',
        'data': {
            'rating': {
                'avg': '{:.1f}'.format(avg_rating) if avg_rating is not None else None,
                'count': rating_count
            },
            'comments': list(c)
        }
    })

class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 1)'

def ecocases_summary(request):
    if request.method != 'GET':
        pass

    # get all requested ecocase ids
    ecocase_ids = request.GET.get('ids', '').split(',')

    ecocase = Ecocase.objects.filter(id__in=ecocase_ids).annotate(
        avg_rating=Round(Avg('rating__rating')), # avg on rating column of rating table
        comment_count=Count('comment', distinct=True)
    ).values()

    ecocases = {}
    for ecocase in list(ecocase):
        ecocases[ecocase.get('id')] = ecocase

    return JsonResponse({
        'status': 'success',
        'data': {
            'ecocases': ecocases
        }
    })


''' API '''

class EcocaseViewSet(viewsets.ModelViewSet):  
    serializer_class = EcocaseSerializer
    queryset = Ecocase.objects.all()


class EcocaseCommentViewSet(viewsets.ModelViewSet):
    serializer_class = EcocaseCommentSerializer
    queryset = EcocaseComment.objects.all()
    print('ecocase comments:', queryset)