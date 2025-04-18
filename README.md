<h1 align="center">Backend Prisma/Docker Demo</h1>

<h3 align="center">It's a Node and Express CRUD Operations</h3>

<br />

<h2 align="center">🖥️ Tech Stack</h2>


<h4 align="center">Backend:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PGSQL" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JsonWebToken" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <br />&#10023;
  <a href="https://github.com/aakash-full-stack-developer/crud-node-express-pgsql-docker/issues">Report Bug</a> &#10023;
  <a href="#Getting-Started">Getting Started</a> &#10023; 
  <a href="#Install">Installing</a> &#10023;
  <a href="#Contact">Author</a> &#10023;
</p>


## Getting Started

This project was built using JavaScript, Rest API Architecture, Node JS, Express and PostgreSQL. It is CRUD Operation and for running on your local environment you should follow these guidelines.

<br />

## 🚀 Features
- Login and Signup User Account
- JWT (Json Web Token) Authentication and BcryptJS Password Hashing
- Email Service Implemented
- Dynamic OTP Generation
- Country Validation
- Product CRUD Operation
- Token Verification
- Request Validation/Sanitization
- Error Handling

<br />


### Prerequisites

- NPM
- Node JS
- Docker Compose

### Setup


The project repository can be found in [GitHub link](https://github.com/aakash-full-stack-developer/crud-node-express-pgsql-docker) or just clone the project using this command.


```
Using HTTPS

# git clone https://github.com/aakash-full-stack-developer/crud-node-express-pgsql-docker.git
```

+ Open terminal on your workspace with

```
cd /home/workspace/crud-node-express-pgsql-docker
```


## Install

Install NPM

Check that you have node and npm installed

To check if you have Node.js installed, run this command in your terminal:


```
node -v
```

To confirm that you have npm installed you can run this command in your terminal:


```
npm -v
```

To install all the dependences of the project, run the following command:


```
cd crud-node-express-pgsql-docker

npm install

```

Set Env file as per .env.example


Start docker

```
docker-compose --env-file .env up -d

docker exec -it my_postgres psql -U myuser -d mydatabase

```

Run Prisma


```
npx prisma generate

npx prisma migrate reset

npx prisma migrate dev

```


To run the application got to the client folder and run the following command:

```
npm dev
```





### Tools used on this project

- Visual Studio Code
- Docker
- DBEver

<br />



## Contact

If you want to contact me, you can reach me through below handles.

[![linkedin](https://img.shields.io/badge/Aakash_L-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aakash-full-stack-developer/)
[![GitHub](https://img.shields.io/badge/Aakash_L-20232A?style=for-the-badge&logo=Github&logoColor=white)](https://github.com/aakash-full-stack-developer)

© 2025 Aakash L



## Show your support

Give a ⭐️ if you like this project!