from aliennorDjangoBackend.settings.common import *

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

DEBUG = False
SECRET_KEY = os.environ['SECRET_KEY']