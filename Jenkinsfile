pipeline {
    agent any
    
    tools {
        nodejs "node"
        // Remove the docker tool line that's causing the error
    }
    
    environment {
        // Docker registry credentials
        DOCKER_REGISTRY = "docker.io"
        DOCKER_IMAGE = "vinay348/examhub"
        DOCKER_CREDENTIALS_ID = "7ce9816c-3c28-4abc-ac03-b5693af634ca"
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
        
        stage('Generate Prisma Client') {
            steps {
                bat 'npx prisma generate'
            }
        }
        
        stage('Build Application') {
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
                set NEXT_TELEMETRY_DISABLED=1
                npm run build
                '''
            }
        }
        
        stage('Build and Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    // Build the Docker image
                    bat "docker build -t %DOCKER_IMAGE%:latest -t %DOCKER_IMAGE%:%BUILD_NUMBER% ."
                    
                    // Login to Docker registry
                    bat "docker login ${DOCKER_REGISTRY} -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                    
                    // Push Docker images
                    bat "docker push %DOCKER_IMAGE%:latest"
                    bat "docker push %DOCKER_IMAGE%:%BUILD_NUMBER%"
                }
            }
        }
        
        stage('Success') {
            steps {
                echo 'Build and Docker push completed successfully!'
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images to avoid filling up the Jenkins server
            bat "docker image prune -f"
        }
        failure {
            echo 'The build failed! Please check the logs for more information.'
        }
    }
}
