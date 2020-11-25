# Vietnamese_Restaurant
Techonogies using:

Backend: Spring Boot.

Frontend: ReactJS + Bootstrap.

Database: MySQL.
## Back-end:
 - In Mysql create a schema with name is restaurant
 - Open `src/main/resources/application.properties` and change the following lines:
```
spring.datasource.username= root
spring.datasource.password= 123456
```
 - Run Spring Boot application
 - Run following SQL insert statements
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_WAITER');
INSERT INTO roles(name) VALUES('ROLE_CHEF');
INSERT INTO roles(name) VALUES('ROLE_CASHIER');
INSERT INTO roles(name) VALUES('ROLE_MANAGER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```
## Front-end:
 - Project setup
In the project directory, run:
```
npm install
# or
yarn install
```
 - Run project
```
npm start
# or
yarn start
```
 - Open http://localhost:8081 to view it in the browser.
