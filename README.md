# Project Test


this repo contain answer/solution for question1 & question2


##  Question1

answer for question 1 can be found at:
./src/question1/command/question1.command.ts method answerQuestion1

you can run the solution with command:
```
npm run console:dev question1 -- -n 5
```
parameter -n is dynamic so you can parse any number

> make sure you run all requirement with command:
```
npm install
```


## Question 2

## architecture
for architecture i use clean architecture and i use 3 layer:
1. Controller Layer -> this layer for handle route. so this layer will validate all incoming data, authentication checking, return response, etc. 
2. Usecase layer -> this layer for handle logic
3. Repository layer -> this layer for handle communication with datasource/external source

framework using **nestjs** with **typescript**. database can be anything, but in this project i use mysql

## Preparation
install all requirement with command:
```
npm install
```
we recommend using **node version >=17**

create ```config.yaml``` inside folder ```./config```
you can see example from file ```./config/config.yaml.example```

## Migration Database
- create new database first
- set database connection setting in file config ```./config/config.yaml```
- run command: ```npm run build```
- run command: ```npm run typeorm migration:generate -- ./migrations/initial-commit -d ./data-source.ts```
    this command for generate migration/DDL for table
- run command: ```npm run typeorm migration:run -- -d ./data-source.ts```
    this command to execute DDL for table

## Run The app
To run the application can use command:
- Development
    ```npm run start:dev```
- Production
    - for production we need to build the app first using command
        ```npm run build```
    - and for running the app using generated code for previous step, using command
        ```npm run start```

## create admin user
To create admin user, using command:
```
npm run console:dev useradmin -- -e <email> -p <password>
```
example
```
npm run console:dev useradmin -- -e test@test.com -p 123
```


## Api documentation
api documentation can be found at (after running the app):
```
http://localhost:3000/docs
```


## Assumption
1. all guest can fill in guest book without authentication
2. all field for guest book all mandatory (name, phone, address, note)
3. all guest can see all data of guest book (phone & address are hidden)
4. phone number can be duplicate, so guest can input multiple times with same phone
5. for admin role, user need to authenticate first
6. authentication using header Authorization with value ```bearer <token>```
7. admin can get all guestbook and delete guestbook by id only.


## Unit Test Plan
for unit test plan i plan to add unit test to service/usecase & controller
1. unit test for controller
    > to test validation with positive & negative data and check if controller give expected response based on scenario
    > to follow best practice of unit test, unit test for controller will use mock for called service inside controller so controller unit test not dependent to external resource/dependencies


2. unit test for service/usecase
    > to test logic and flow and give expected result
    > to follow best practice, unit test for service will use mock for external resource/dependencies and repository/source data. like service in Admin module, which call service guestbook, in admin unit test it will be mocked
    > unit test will test all function inside service/usecase

reason why i don't add unit for repository because repository only from database, if there's repository from external resource then i can add unit test for it & integration test too
