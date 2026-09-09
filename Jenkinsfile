pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                echo 'Verifying Node.js and NPM environment...'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Run Unit Test Suite') {
            steps {
                echo 'Executing automated unit tests...'
                sh 'npm test'
            }
        }

        stage('Build & Verify Assets') {
            steps {
                echo 'Verifying web application core files...'
                sh 'test -f index.html'
                sh 'test -f style.css'
                sh 'test -f script.js'
                echo 'Asset verification succeeded!'
            }
        }
    }

    post {
        always {
            echo 'Jenkins pipeline execution completed.'
        }
        success {
            echo 'Pipeline Build Status: SUCCESS'
        }
        failure {
            echo 'Pipeline Build Status: FAILURE'
        }
    }
}
