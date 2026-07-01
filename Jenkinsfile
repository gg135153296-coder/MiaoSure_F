pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh '''
          export NVM_DIR="/var/lib/jenkins/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 20

          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          export NVM_DIR="/var/lib/jenkins/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm use 20

          npm run build
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          sudo /usr/local/bin/deploy-miaosure-frontend "$WORKSPACE/dist"
        '''
      }
    }
  }
}