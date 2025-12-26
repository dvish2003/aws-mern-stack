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
        // testing build stage
        stage('Build Frontend and Backend'){
            steps {
                sh '''
                    cd frontend
                    npm install
                    npm run build
                    cd ../backend
                    npm install
                    npm run build
                '''
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
             withCredentials([string(credentialsId: 'docker-hub-password', variable: 'vish_docker_hub_password')]) {
                   script {
                         sh "docker login -u dvish2003 -p ${vish_docker_hub_password}"
                   }
                }
            }

        }
        stage('Push Docker Images') {
            steps {
                  script {
                        sh "docker push ${DOCKER_REPO_FE}:latest"
                        sh "docker push ${DOCKER_REPO_BE}:latest"
                }
            }
        }
       
        stage('Deploy with Docker Compose') {
                steps {
                    sh '''
                        docker-compose pull
                        docker-compose down
                        docker-compose up -d
                    '''
                }
            }
        }
    post {
        always {
            cleanWs()
            sh 'docker logout'
        }
    }
}
