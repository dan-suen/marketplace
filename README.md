# Marketplace
=========

## Project Setup

1. This project requires a local or remote installation of PostgreSql.
Log into PostgreSql and run the following commands: 
```
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE marketplace OWNER labber;
```
Update the .env file with your correct information: 
e.g. 
  - username: `labber` 
  - password: `labber` 
  - database: `marketplace`

2. Install all dependencies:
```
npm run install 
```

3. Follow instructions.md in db/schema to create the database tables locally.

4. Follow instructions.md in db/seeds to seed the created database tables locally.


## Getting Started

1. Fix to binaries for sass: `npm rebuild node-sass`
2. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
3. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
