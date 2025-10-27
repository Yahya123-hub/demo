pipeline {
    agent any

    tools {
        nodejs "NodeJS" // make sure NodeJS tool is configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/playwright-ci-demo.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright install --with-deps'
                sh 'npx playwright test --reporter=list'
            }
        }

        stage('Archive results') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            junit 'test-results.xml' // optional if you export results
        }
    }
}
