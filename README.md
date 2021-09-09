# Documentation

## Backend API for our restaurant booking web app.

We created a CRUD application with Node.js (with TypeScript) and express server with four routes for our restaurant booking site.

- Post (add-booking)
- Get (bookings)
- Put (edit-booking/:id)
- Delete (delete-booking/:id)

We use MongoDB as our database.

## Conditions
- A Customer can book up to 12 people. 1-6 people == 1 table, 7-12 == 2 tables.
- The restuarant only have 15 tables.
- We have only two seating times: 18:00 & 21:00

## Worth noting 
- After a succesful booking, the customer will recieve a confirmation mail with a link for canceling their booking. 
- We use react calender, our database handle the logic for calculating availability and respond true or false to front end. 
- When in admin edit on front end, we have logic to handle following scenario: 
  - 14 tables are booked on a specifit seating time and date
  - When admin try to edit a customer that has one of those 14 tables, admin can add guests so that the booking equals two tables.

# Improvements (we only had 3 weeks)
- Confirmation mail when canceling booking
- Some way for the restaurant owner to change number of tables, add seating Times etc. 
- Login for admin
and much more. 

## Installation

1. [Clone repo](https://github.com/MattSedmak/restaurant_server)
2. `npm i`
3. create a nodemon.json:

```
{
  "env": {
    "MONGO_USER": "your_username",
    "MONGO_PASSWORD": "your_pwd",
    "MONGO_DB": "your_database",
    "USERMAIL": "your_company_mail",
    "USERPASSWORD": "your_company_mail_password"
  }
}
```

4. `npm start`

## Naming conventions

- Variabel names should be descriptive and use camelCase
- Functions should be arrow functions (ES6), descriptive and the names in camelCase
- Interface names should always start with a capital I and PascalCase, eg. IBooking

## Comments

This is a school task in our REACT Course, where we will build a REACT app and our own Backend for our restaurant booking app using NodeJS and MongoDB.

We use TypeScript for the project to help us with production, it helps us by making sure that we are picking up on errors quickly and gives our project a solid structure.

LINK TO OUR REACT APP
