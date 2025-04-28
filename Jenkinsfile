pipeline {
    agent any
    
    tools {
        nodejs "node"  // Make sure this matches your tool name in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'  // Use 'bat' instead of 'sh' for Windows
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm run build'  // Use 'bat' instead of 'sh' for Windows
            }
        }
        
        stage('Success') {
            steps {
                echo 'Build completed successfully!'
            }
        }
    }
}