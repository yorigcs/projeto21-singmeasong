<!-- PROJECT LOGO -->
<br />
<div align="center">
 

<!-- Link to src -->
  <h3 align="center">sing me a song</h3>
  <p>
    Back end Development Project to tests
    <br />
</div>

<!-- Built With -->
<div align="center">
  <h3>Built With</h3>
   <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white height="30px"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white height="30px"/>
</div>

<!-- Description -->
# Description

A system to create youtube musics recommendations. This repo is just for test purpose.


## Getting this project

Clone the project

```bash
  git clone https://github.com/yorigcs/projeto21-singmeasong
```

Go to the project directory

```bash
  cd projeto21-singmeasong
```

## Starting back-end
Go to the back-end folder

```bash
  cd back-end
```

Install dependencies

```bash
  npm install
```
Create an .env files with the follow env params

```bash
  DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourDataBase?schema=public"
```

Create database

```bash
  npm run prisma:migrate
```

Start server

```bash
  npm run dev
```

## Starting front-end
Go to the back-end folder

```bash
  cd front-end
```

Install dependencies

```bash
  npm install
```
Create an .env files with the follow env params

```bash
  REACT_APP_API_BASE_URL=http://localhost:5000
```
Start server

```bash
  npm start
```

## Running Tests (back-end)

Ensure you're in the folder back-end.

Create an .env.test files with the follow env params

```bash
  DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourDataBase_test?schema=public"
```

To run only unit tests, run the following command

```bash
  npm run test:unit
```
in the terminal press "a" to run the tests and "q" to exit.

To run only integration tests, run the following command

```bash
  npm run test:integration
```
in the terminal press "a" to run the tests and "q" to exit

To run all tests with coverage, run the following command

```bash
  npm run test:verbose
```
in the terminal press "a" to run the tests and "q" to exit

## Running Tests (front-end)

Ensure you're in the folder front-end.

Ensure you started the back-end and front-end.

To run tests without cypress UI, run the following command

```bash
  npm run cypress:run
```


To run tests with cypress UI, run the following command

```bash
  npm run cypress:open
```


