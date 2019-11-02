# Riskident FullStack Test App
This app is built with nodejs, express and typescript

## Run the app locally
Clone the application into a working diretory of your choice.
Follow below steps tor run the app on your local machine: 
Dependancies (Ensure that the following dependancies are installed on the host machine):
1. NodeJs (prefferably >= 12.13.0)
2. Typescript  (prefferaly >= 3.6.4)

cd into the app root folder

### Rnstall dependancies 
`npm install`

### Run the app in dev mode
`npm run dev`

Head to:
http://localhost:3000 to see the web interface

### Run the app in production mode
`npm start`

## Deploy the app using docker
Ensure that docker is installed and running on the host machine
run the following commands;

`docker build -t riskident-fulstack-task .` _ensure you add the last '.' on the command above_  
`docker run -p 3000:3000 riskident-fulstack-task`

Head to:
http://localhost:3000 to see the web interface


# API Endpoints
To see test API Data:
- All Data:  
http://localhost:3000/api/transactions  
- Filtered Data by ID and confidence:    
http://localhost:3000/api/transactions?transactionId=5c868b2213b36f773efcee81&confidenceLevel=0.1

- For flat structure, add flat=true to the url params  
http://localhost:3000/api/transactions?flat=true  
http://localhost:3000/api/transactions?transactionId=5c868b2213b36f773efcee81&confidenceLevel=0.1&flat=true  
_Change the transactionId and/or confidenceLevel to play around with the filters_

## Live demo
All data:  
[https://peter-riskident-fullstack-task.herokuapp.com/api/transactions]

Flat structure  
[https://peter-riskident-fullstack-task.herokuapp.com/api/transactions?flat=true]

Filtered:  
[https://peter-riskident-fullstack-task.herokuapp.com/api/transactions?transactionId=5c868b22d84354bef2474acb&confidenceLevel=0.3]

Flat Structure  
[https://peter-riskident-fullstack-task.herokuapp.com/api/transactions?transactionId=5c868b22d84354bef2474acb&confidenceLevel=0.3&flat=true]

