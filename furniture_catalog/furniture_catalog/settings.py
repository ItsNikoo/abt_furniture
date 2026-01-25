import os
from datetime import timedelta
from pathlib import Path
from decouple import config

YANDEX_STORAGE_ENDPOINT = config('YANDEX_STORAGE_ENDPOINT')
YANDEX_STORAGE_BUCKET = config('YANDEX_STORAGE_BUCKET')
YANDEX_ACCESS_KEY = config('YANDEX_ACCESS_KEY')
YANDEX_SECRET_KEY = config('YANDEX_SECRET_KEY')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-d90$&ig18i$-7_)w2h0^q4^o$xh-(ee6**n=7mz1pd1qow49%3')

# SECURITY WARNING: don't run with debug turned on in production!
#DEBUG = config('DEBUG', default=False, cast=bool)
DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', 'frontend', 'nginx', '178.250.242.124', 'kuhni-abt.ru']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'catalog',
    'knox',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'djangorestframework_camel_case.render.CamelCaseJSONRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'djangorestframework_camel_case.parser.CamelCaseJSONParser',
        'djangorestframework_camel_case.parser.CamelCaseMultiPartParser',
        'djangorestframework_camel_case.parser.CamelCaseFormParser',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'knox.auth.TokenAuthentication',
    ]
}

REST_KNOX = {
    'TOKEN_TTL': timedelta(hours=1),
    'AUTO_REFRESH': False,
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost',
    "http://my_frontend:3000",
    "http://127.0.0.1:3000",
    "http://178.250.242.124",
    "https://kuhni-abt.ru",
    "https://www.kuhni-abt.ru"
]

CORS_ALLOW_CREDENTIALS = True

# settings.py
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CSRF_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SAMESITE = 'Lax'
# CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_HTTPONLY = True

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

ROOT_URLCONF = 'furniture_catalog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'furniture_catalog.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.postgresql',
         'NAME': config('POSTGRES_DB', default='furniture_catalog'),
         'USER': config('POSTGRES_USER', default='postgres'),
         'PASSWORD': config('POSTGRES_PASSWORD', default='postgres'),
         'HOST': config('DB_HOST', default='db'),
         'PORT': config('DB_PORT', default='5432'),
     }
    #'default': {
    #    'ENGINE': 'django.db.backends.sqlite3',
    #    'NAME': BASE_DIR / 'db.sqlite3'
    #},
}

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/app/static'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Эта строка обязательна!

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Настройки для отправки на почту
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.majordomo.ru'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER")  # Ваш email
EMAIL_HOST_PASSWORD = config("EMAIL_PASSWORD", default="")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")

#if DEBUG==True:
    # Письма будут выводиться в консоль
 #   EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
  #  DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL')
    # EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    # EMAIL_HOST = 'smtp.gmail.com'
    # EMAIL_PORT = 587
    # EMAIL_USE_TLS = True
    # EMAIL_HOST_USER = os.getenv("DEV_MAIL")  # Ваш Gmail
    # EMAIL_HOST_PASSWORD = os.getenv('DEV_PASSWORD')  # Пароль приложения (не обычный пароль!)
    # DEFAULT_FROM_EMAIL = os.getenv("DEV_MAIL")  # Тот же email, что и выше
#else:
    # Реальная отправка через SMTP
   # EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   # EMAIL_HOST = 'smtp.majordomo.ru'
   # EMAIL_PORT = 587
  #  EMAIL_USE_TLS = True
  #  EMAIL_HOST_USER = config("EMAIL_HOST_USER")
 #   EMAIL_HOST_PASSWORD = config("EMAIL_PASSWORD")
#    DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
