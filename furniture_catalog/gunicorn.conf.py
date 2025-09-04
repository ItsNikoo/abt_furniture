# gunicorn.conf.py
import logging
import sys

# Настройки логирования
accesslog = "-"  # Логировать в stdout
errorlog = "-"   # Логировать ошибки в stdout
loglevel = "debug"  # Уровень логирования
capture_output = True  # Перехватывать stdout/stderr

# Формат логов
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Включить подробное логирование
logconfig_dict = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'stream': sys.stdout
        },
    },
    'loggers': {
        'gunicorn.error': {
            'level': 'DEBUG',
            'handlers': ['console'],
            'propagate': False
        },
        'gunicorn.access': {
            'level': 'DEBUG',
            'handlers': ['console'],
            'propagate': False
        }
    }
}