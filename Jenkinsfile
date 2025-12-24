pipeline {
    agent any 
    
    environment {
        DOCKER_REPO_FE = 'dvish2003/mern-frontend'
        DOCKER_REPO_BE = 'dvish2003/mern-backend'
    }

    stages {
        stage ('Checkout Code') {
            steps {
                git url: 'https://github.com/dvish2003/aws-mern-stack.git', branch: 'main'
            }
        }

        stage('Build frontend'){
            steps {
                dir('./frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build backend'){
            steps {
                dir('./backend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
               script{
                dir('./frontend') {
                    sh "docker build -t ${DOCKER_REPO_FE}:latest ."
                }
                dir('./backend') {
                    sh "docker build -t ${DOCKER_REPO_BE}:latest ."
                }
               }
            }
        }
        stage("Login to DockerHub") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                   script {
                        sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                   }
                }
            }

        }
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                  script {
                        dir('./frontend') {
                            sh "docker push ${DOCKER_REPO_FE}:latest"
                        }
                        dir('./backend') {
                            sh "docker push ${DOCKER_REPO_BE}:latest"
                        }
                  }
                }
            }
        }
        stage('Deployment') {
            steps {
                echo 'Deploying application...'
                // Add your deployment steps here
            }
        }

        post {
            always {
                cleanWs()
                script{
                    sh 'docker logout'
                }
            }
        }
    }
}