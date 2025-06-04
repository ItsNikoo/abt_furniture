from botocore.exceptions import ClientError
from decouple import config
import boto3
import logging

logger = logging.getLogger(__name__)

# Кэшируем сессию boto3
_session = None


def get_s3_client():
    global _session
    if _session is None:
        _session = boto3.session.Session().client(
            service_name='s3',
            endpoint_url=config('YANDEX_STORAGE_ENDPOINT'),
            aws_access_key_id=config('YANDEX_ACCESS_KEY'),
            aws_secret_access_key=config('YANDEX_SECRET_KEY'),
        )
    return _session


def upload_to_yandex_storage(file, filename, folder):
    try:
        s3 = get_s3_client()
        bucket = config('YANDEX_STORAGE_BUCKET')
        file_path = f"{folder}/{filename}"

        s3.upload_fileobj(
            file,
            bucket,
            file_path,
            ExtraArgs={'ACL': 'public-read'}
        )
        file_url = f"{config('YANDEX_STORAGE_ENDPOINT')}/{bucket}/{file_path}"
        return file_url
    except ClientError as e:
        logger.error(f"Ошибка загрузки файла в Yandex Cloud: {str(e)}")
        raise Exception(f"Ошибка загрузки файла: {str(e)}")


def delete_from_yandex_storage(file_url):
    if not file_url:
        return  # Если URL отсутствует, ничего не делаем

    try:
        s3 = get_s3_client()
        bucket = config('YANDEX_STORAGE_BUCKET')
        # Извлекаем ключ файла из URL
        file_key = file_url.replace(f"{config('YANDEX_STORAGE_ENDPOINT')}/{bucket}/", "")
        s3.delete_object(Bucket=bucket, Key=file_key)
        logger.info(f"Файл {file_key} успешно удален из бакета {bucket}")
    except ClientError as e:
        logger.error(f"Ошибка удаления файла из Yandex Cloud: {str(e)}")
        # Не прерываем удаление категории, просто логируем ошибку
    except Exception as e:
        logger.error(f"Неожиданная ошибка при удалении файла: {str(e)}")
