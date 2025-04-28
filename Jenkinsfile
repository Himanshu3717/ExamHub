pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    environment {
        // Define credentials that will be loaded during the pipeline
        DATABASE_URL = credentials('database-url')
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('clerk-publishable-key')
        CLERK_SECRET_KEY = credentials('clerk-secret-key')
        NEXT_PUBLIC_CLERK_SIGN_IN_URL = '/sign-in'
        NEXT_PUBLIC_CLERK_SIGN_UP_URL = '/sign-up'
        NEXT_PUBLIC_EMAILJS_SERVICE_ID = credentials('emailjs-service-id')
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = credentials('emailjs-template-id')
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = credentials('emailjs-public-key')
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
                // Make sure environment variables are available during build
                withEnv([
                    "DATABASE_URL=${env.DATABASE_URL}",
                    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}",
                    "CLERK_SECRET_KEY=${env.CLERK_SECRET_KEY}",
                    "NEXT_PUBLIC_CLERK_SIGN_IN_URL=${env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}",
                    "NEXT_PUBLIC_CLERK_SIGN_UP_URL=${env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}",
                    "NEXT_PUBLIC_EMAILJS_SERVICE_ID=${env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}",
                    "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}",
                    "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}"
                ]) {
                    bat 'npm run build'
                }
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