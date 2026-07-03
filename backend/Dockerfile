# Python base image
FROM python:3.12-slim

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 작업 디렉토리
WORKDIR /app

# 시스템 패키지 설치 (필요 최소)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# requirements 먼저 복사 (캐시 최적화)
COPY requirements.txt /app/

# pip 업그레이드 + 패키지 설치
RUN pip install --upgrade pip && pip install -r requirements.txt

# 프로젝트 전체 복사
COPY . /app/

# static 파일 모으기 (선택)
# RUN python manage.py collectstatic --noinput

# 포트 노출
EXPOSE 8000

# 서버 실행 (개발용)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]