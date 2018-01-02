from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views

ecocases_routes = [
    url(r'^get-all$', views.ecocases_summary, name='ecocases summary'),
    url(r'^ecocase/index$', views.indexView, name='index'),
    url(r'^ecocase/new$', views.EcocaseCreateView.as_view(), name='new ecocase'),
    url(r'^ecocase/post$', views.post_ecocase, name='post ecocase'),
    url(r'^ecocase/(?P<ecocase_id>[a-zA-Z0-9]+)/$', views.ecocase_details, name='ecocase details'),
    url(r'^ecocase/(?P<ecocase_id>[a-zA-Z0-9]+)/rating/$', views.getRating, name='get ecocase rating'),
    url(r'^ecocase/(?P<ecocase_id>[0-9]+)/comments/$', views.get_comments, name='get ecocase comments'),
]

ecocase_rate_routes = [
    url(r'^rate$', views.ecocase_rate, name='ecocase rate'),
]

comment_routes = [
    url(r'^comment$', views.comment, name='comment'),
    url(r'^comment/(?P<id>[0-9]+)/$', views.update_comment, name='update comment'),
]

auth_routes = [
    url(r'^auth/csrf$', views.send_csrf, name='send csrf token'),
    url(r'^auth/login/$', views.login, name='login'),
    url(r'^auth/register/$', views.register, name='register'),
    url(r'^auth/username-exists/$', views.username_exists, name='check unique username'),
]

user_data_routes = [
    url(r'^user/get-data/$', views.get_user_data, name='get user data'),
    url(r'^user/update/$', views.update_data, name='update user data'),
    url(r'^user/update-password/$', views.update_password, name='update user password'),
    url(r'^user/delete/$', views.delete_account, name='delete user account')
]

urlpatterns = ecocases_routes + ecocase_rate_routes + auth_routes + user_data_routes + comment_routes