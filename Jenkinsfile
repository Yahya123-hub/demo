pipeline {
    agent any

    tools {
        nodejs "NodeJS" // make sure NodeJS tool is configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Yahya123-hub/demo.git'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                bat 'npx playwright install --with-deps'
                bat 'npx playwright test --reporter=list'
            }
        }

        stage('Archive results') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }


}
