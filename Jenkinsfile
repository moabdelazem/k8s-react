pipeline {
    agent any
    
    environment {
        // Set environment variables for Node.js
        CI = 'true'
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Starting checkout...'
                
                // Clean workspace to start fresh
                cleanWs()
                
                // Checkout code from repository
                checkout scm
                
                echo '✅ Checkout completed successfully!'
            }
        }
        
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v ${WORKSPACE}:/app -w /app -u root'
                }
            }
            steps {
                echo '📦 Installing npm dependencies...'
                
                // Install dependencies using npm ci for faster, reliable builds
                sh '''
                    echo "Node.js version:"
                    node --version
                    
                    echo "npm version:"
                    npm --version
                    
                    echo "Setting up npm cache..."
                    npm config set cache /tmp/.npm
                    
                    echo "Installing dependencies..."
                    npm ci
                    
                    echo "Dependencies installed successfully!"
                    ls -la node_modules/ | head -10
                '''
                
                echo '✅ Dependencies installation completed!'
            }
        }
        
        stage('Lint Code') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v ${WORKSPACE}:/app -w /app -u root'
                }
            }
            steps {
                echo '🔍 Running code linting...'
                
                // Run ESLint to check code quality
                sh '''
                    echo "Checking if node_modules exists..."
                    ls -la node_modules/ | head -5
                    
                    echo "Running ESLint..."
                    npm run lint
                    
                    echo "Linting completed!"
                '''
                
                echo '✅ Code linting completed!'
            }
        }
        
        stage('Build Application') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v ${WORKSPACE}:/app -w /app -u root'
                }
            }
            steps {
                echo '🚀 Building React application...'
                
                // Build the React app using Vite
                sh '''
                    echo "Checking if node_modules exists..."
                    ls -la node_modules/ | head -5
                    
                    echo "Building application..."
                    npm run build
                    
                    echo "Build completed! Checking output..."
                    ls -la dist/
                    
                    echo "Build artifacts:"
                    find dist/ -type f -name "*.js" -o -name "*.css" -o -name "*.html"
                    
                    echo "Build size:"
                    du -sh dist/
                '''
                
                echo '✅ Application build completed successfully!'
            }
        }
        
        stage('Archive Build Artifacts') {
            steps {
                echo '📁 Archiving build artifacts...'
                
                // Archive the build output for later use (runs on Jenkins agent, not in Docker)
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                
                echo '✅ Build artifacts archived successfully!'
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline completed successfully!'
            echo '✅ Your React application has been built and is ready for deployment!'
            
            // Display build summary
            sh '''
                echo "=== BUILD SUMMARY ==="
                echo "Build Number: ${BUILD_NUMBER}"
                echo "Build Status: SUCCESS"
                echo "Build Output: dist/ directory"
                echo "Build Size:"
                du -sh dist/
                echo "===================="
            '''
        }
        
        failure {
            echo '❌ Pipeline failed!'
            echo '💡 Check the logs above to identify the issue.'
        }
        
        always {
            echo '🧹 Cleaning up temporary files...'
            
            // Clean up node_modules to save space (optional)
            sh '''
                echo "Workspace cleanup..."
                # Uncomment the next line if you want to clean node_modules
                # rm -rf node_modules/
                echo "Cleanup completed!"
            '''
        }
    }
}