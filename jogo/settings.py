# coding: utf-8
"""
Django settings for jogo project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""
from decouple import config
from dj_database_url import parse as db_url
from unipath import Path
BASE_DIR = Path(__file__).parent

SOUTH_TESTS_MIGRATE = False
#Usar o South para preparar o banco nos testes?
#True: Sim,(Default)
# false Não! Use o Syncdb

# SECRET_KEY = config('SECRET_KEY')

# DEBUG = config('DEBUG', default=False, cast=bool)

# TEMPLATE_DEBUG = DEBUG

SECRET_KEY='k0oln8awgir+up04n+us9^!1+@)%e*u!p*mlk-$a0ce%_#39-t'

ALLOWED_HOSTS = ['.localhost','127.0.0.1','.herokuapp.com']


# Application definition

INSTALLED_APPS = (
    'bootstrap_admin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'south',
    'jogo.core',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'jogo.urls'

WSGI_APPLICATION = 'jogo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': config(
	'DATABASE_URL',
	default='sqlite:///' + BASE_DIR.child('db.sqlite3'),
	cast=db_url),
    }

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'pt-BR'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_ROOT = BASE_DIR.child('staticfiles')
STATIC_URL = '/static/'
