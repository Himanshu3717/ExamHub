pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    environment {
        DATABASE_URL = "postgresql://neondb_owner:npg_w0ZH5QrYUfzJ@ep-empty-breeze-a49cwsto-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require" // Replace with your actual database URL
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
                bat 'npm run build'
            }
        }
        
        stage('Success') {
            steps {
                echo 'Build completed successfully!'
            }
        }
    }
}