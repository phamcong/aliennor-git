from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views

ecocases_routes = [
    url(r'^get-all$', views.ecocases_summary, name='ecocases summary'),
    url(r'^$', views.get_ecocases, name='get ecocases'),
    url(r'^ecocase/index$', views.indexView, name='index'),
    url(r'^ecocase/new$', views.EcocaseCreateView.as_view(), name='new ecocase'),
    url(r'^ecocase/post$', views.post_ecocase, name='post ecocase'),
    url(r'^ecocase/(?P<ecocase_id>[a-zA-Z0-9]+)/$', views.ecocase_details, name='ecocase details'),
    url(r'^ecocase/(?P<ecocase_id>[a-zA-Z0-9]+)/rating/$', views.getRating, name='get ecocase rating'),
    url(r'^ecocase/(?P<ecocase_id>[0-9]+)/comments/$', views.get_comments, name='get ecocase comments'),
    url(r'^filters$', views.get_filter_criteria, name='get filter criteria'),
    url(r'^search/(?P<filter_criteria>)/$', views.get_filtered_ecocases, name='filter ecocases')
]

ecocase_rate_routes = [
    url(r'^rate$', views.ecocase_rate, name='ecocase rate'),
]

ecocase_comment_routes = [
    url(r'^comments$', views.EcocaseCommentViewSet, name='get all comments'),
    url(r'^comment$', views.comment, name='comment'),
    url(r'^comment/(?P<id>[0-9]+)/$', views.update_comment, name='update comment')
]

urlpatterns = ecocases_routes + ecocase_rate_routes + ecocase_comment_routes