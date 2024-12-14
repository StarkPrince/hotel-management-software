pipeline {
    agent any
    environment {
        // Define environment variables
        SERVER_IP = '20.198.16.97'
        SSH_USERNAME = 'mithilastack'
    }
    parameters {
        // Allow dynamic input for branch selection, etc.
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to deploy')
    }
    stages {
        stage('Preparation') {
            steps {
                echo "Preparing environment..."
                // Add any preparation steps if necessary
            }
        }
        stage('Clone Github repo on VM and Update Docker containers on VM') {
            steps {
                script {
                    // Execute SSH command with error handling
                    sh '''
                    set -e
                    ssh -i ~/.ssh/id_rsa "$SSH_USERNAME@$SERVER_IP" << 'EOF'
                    sudo apt-get update
                    echo "successfully ssh into the server"

                    sudo rm -rf spirit / || {
                        echo 'Failed to remove existing directory.'
                        exit 1
                    }
                    echo "Existing repository removed successfully."

                    git clone git@github.com:Mithilastack/spirit.git || {
                        echo 'Failed to clone repository test.'
                        exit 1
                    }
                    echo "Repository cloned successfully."
                    
                    cd spirit || {
                        echo 'Failed to change directory.'
                        exit 1
                    }
                    echo "Directory changed successfully."

                    cp /home/spirit/spirit.env /home/mithilastack/spirit/.env || {
                        echo 'Failed to copy .env file.'
                        exit 1
                    }
                    echo ".env file copied successfully."

                    npm install || {
                        echo 'Failed to install npm packages.'
                        exit 1
                    }
                    echo "NPM packages installed successfully."
                    npm run build || {
                        echo 'Failed to build the project.'
                        exit 1
                    }
                    echo "Project build successfully."
                    npx next start -p 3009 || {
                        echo 'Failed to start the project.'
                        exit 1
                    }
                    echo "Project started successfully."
                    
                    sudo pm2 stop spirit-hms-backend-3050 || {
                        echo 'pm2 stop failed.'
                        // exit 1
                    }
                    echo " pm2 stopped successfully."
                    npx tsc || {
                        echo 'tsc failed.'
                        exit 1
                    }
                    echo " tsc successfully."

                    sudo pm2 start server/index.js --name spirit-hms-backend-3050 || {
                        echo 'pm2 start failed.'
                        exit 1
                    }
                    echo " pm2 updated successfully."
                    echo "Successfully updated  backend on VM."
                    '''
                }
            }
        }
    }
    post {
        always {
            script {
                def jobName = env.JOB_NAME
                def buildNumber = env.BUILD_NUMBER
                def pipelineStatus = currentBuild.result ?: 'UNKNOWN'
                def bannerColor = pipelineStatus.toUpperCase() == 'SUCCESS' ? 'green' : 'red'
                
                // Define recipients
                def recipients = [
                    'itsonlykartik@gmail.com',
                    'aashutoshjha41@gmail.com',
                ]
                
                // Create the email body
                def body = """
                    <html>
                    <head>
                        <style>
                            body {font-family: Arial, sans-serif;}
                            .container {max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);}
                            .header {background-color: ${bannerColor}; color: white; text-align: center; padding: 15px 0; border-radius: 5px 5px 0 0;}
                            .content {padding: 20px;}
                            .footer {text-align: center; background-color: #f0f0f0; padding: 10px 0; border-radius: 0 0 5px 5px;}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>${jobName} - Build ${buildNumber}</h1>
                                <p>Pipeline Status: ${pipelineStatus.toUpperCase()}</p>
                            </div>
                            
                            <div class="content">
                                <p>Check the <a href="${env.BUILD_URL}">console output</a> for full details.</p>
                                <h4>Failed Steps:</h4>
                                <pre></pre>
                                <h4>Errors:</h4>
                                <pre></pre>
                            </div>
                            
                            <div class="footer">
                                <p>Thanks,<br>Mithilastack DevOps Team</p>
                            </div>
                        </div>
                    </body>
                    </html>
                """
                
                // Send email to multiple recipients
                emailext(
                    subject: "${pipelineStatus.toUpperCase()} - jenkins result ${jobName} - Build ${buildNumber}",
                    body: body,
                    to: recipients.join(','),
                    from: 'mithilastackclient@gmail.com',
                    replyTo: 'mithilastackclient@gmail.com',
                    mimeType: 'text/html'
                )
            }
        }
    }
}