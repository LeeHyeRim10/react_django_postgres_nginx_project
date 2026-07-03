pipeline {

    agent any

    environment {
        COMPOSE_PROJECT_NAME = "fullstack-app"
    }

    stages {

        // =========================
        // 1. React dependencies
        // =========================
        stage('Install Frontend Dependencies') {
            steps {
                sh '''
                    cd frontend
                    npm ci
                '''
            }
        }

        // =========================
        // 2. React build
        // =========================
        stage('Build React') {
            steps {
                sh '''
                    cd frontend
                    npm run build
                '''
            }
        }

        // =========================
        // 3. Docker Build
        // =========================
        stage('Docker Build') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        // =========================
        // 4. Deploy
        // =========================
        stage('Deploy') {
            steps {
                sh '''
                    docker compose down --remove-orphans || true
                    docker compose up -d --build
                '''
            }
        }

    }

    post {

        success {
            echo '🚀 React + Django + Postgres + Nginx 배포 성공'
        }

        failure {
            echo '❌ 배포 실패 - 로그 확인 필요'
        }

        always {
            echo 'Pipeline 종료'
        }
    }
}