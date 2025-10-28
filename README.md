# Todo List - Simple UI React Project

## Objective:
- This project is an UI part for the complete guideline to deploy a Spring Boot Project as Backend for free.

## Deployment Platform:
- Use https://www.netlify.com/ where this project will be uploaded.

## Deployment Process
- Clone this project.
- `npm install` to install all dependencies.
- `npm start` to run the project locally.
- `npm run build` to build the project.
- Add a new project and upload the build folder in Netlify.com.
- Add the following environment variable
    - `REACT_APP_API_BASE_URL=<Your_backend_live_url>`
- Also update the environment variable of your backend project
    - `FRONTEND_URL=<What_will_be_the_live_url_of_frontend>`

#### Live URL: https://sboot-my-todo.netlify.app/ 

#### Backend Project Repository: https://github.com/TareqSefati/Todo-Rest-API

# Great! You have successfully deployed your full stack project (Spring Boot + React). 