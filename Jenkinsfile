pipeline {
    agent any
    
    tools {
        nodejs "node"
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
                bat '''
                set DATABASE_URL=postgresql://neondb_owner:npg_w0ZH5QrYUfzJ@ep-empty-breeze-a49cwsto-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
                set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW50ZW5zZS1idWxsZnJvZy0yNC5jbGVyay5hY2NvdW50cy5kZXYk
                set CLERK_SECRET_KEY=sk_test_Z626nvMmALeSREy19H6946qQNjjDaNeK5dlLFLpLjG
                set NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
                set NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
                set NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_t990zja
                set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_aybwglz
                set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=6rFa5l5roeEDZLibN
                npm run build
                '''
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