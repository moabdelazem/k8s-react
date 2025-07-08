pipeline {
    agent none
    
    environment {
        CI = 'true'
        BROWSER = 'none'
        DOCKER_REGISTRY = 'docker.io'
        IMAGE_NAME = 'moabdelazem/k8s-react'
    }
    
    stages {
        stage('Checkout') {
            agent {
                docker {
                    image 'alpine/git:latest'
                }
            }
            steps {
                checkout scm
                stash includes: '**/*', name: 'source-code'
            }
        }
        
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root:root'
                }
            }
            environment {
                HOME = '/tmp'
            }
            steps {
                unstash 'source-code'
                
                sh '''
                    echo "Installing dependencies..."
                    npm ci --cache /tmp/.npm --prefer-offline
                    
                    echo "Building application..."
                    npm run build
                '''
                
                stash includes: 'build/**/*', name: 'build-artifacts'
            }
        }
        
        stage('Docker Build') {
            agent {
                docker {
                    image 'docker:latest'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                unstash 'source-code'
                unstash 'build-artifacts'
                
                script {
                    def imageTag = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
                    def fullImageName = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        docker build -t ${fullImageName} .
                        docker tag ${fullImageName} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                    """
                    
                    env.DOCKER_IMAGE = fullImageName
                }
            }
        }
        
        stage('Security Scan') {
            agent {
                docker {
                    image 'aquasec/trivy:latest'
                    args '--entrypoint=""'
                }
            }
            steps {
                sh '''
                    trivy image --format json --output security-report.json ${DOCKER_IMAGE}
                    trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'security-report.json', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        
        failure {
            echo 'Pipeline failed!'
        }
        
        always {
            // Clean up can be done here if needed
            echo 'Pipeline completed.'
        }
    }
}