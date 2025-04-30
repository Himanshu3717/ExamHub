pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        DATABASE_URL = credentials('DATABASE_URL')
        CLERK_PUBLISHABLE_KEY = credentials('CLERK_PUBLISHABLE_KEY')
        CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')
        EMAILJS_SERVICE_ID = credentials('EMAILJS_SERVICE_ID')
        EMAILJS_TEMPLATE_ID = credentials('EMAILJS_TEMPLATE_ID')
        EMAILJS_PUBLIC_KEY = credentials('EMAILJS_PUBLIC_KEY')
        NEXT_PUBLIC_CLERK_SIGN_IN_URL = '/sign-in'
        NEXT_PUBLIC_CLERK_SIGN_UP_URL = '/sign-up'
    }

    triggers {
        githubPush() // Trigger on GitHub push events
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat """
                set DATABASE_URL=${env.DATABASE_URL}
                set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${env.CLERK_PUBLISHABLE_KEY}
                set CLERK_SECRET_KEY=${env.CLERK_SECRET_KEY}
                set NEXT_PUBLIC_CLERK_SIGN_IN_URL=${env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
                set NEXT_PUBLIC_CLERK_SIGN_UP_URL=${env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
                set NEXT_PUBLIC_EMAILJS_SERVICE_ID=${env.EMAILJS_SERVICE_ID}
                set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${env.EMAILJS_TEMPLATE_ID}
                set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${env.EMAILJS_PUBLIC_KEY}
                npm run build
                """
            }
        }

        stage('Test Server') {
            steps {
                bat 'node server-test.js'
            }
        }

        stage('Success') {
            steps {
                echo 'Build completed successfully!'
            }
        }
    }

    post {
        failure {
            echo 'The build failed! Please check the logs for more information.'
        }
    }
}
