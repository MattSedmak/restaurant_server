# Documentation

## Backend API for our restaurant booking web app.

We created a CRUD application with Node.js (with TypeScript) and express server with four routes for our restaurant booking site.

- Post (add-booking)
- Get (bookings)
- Put (edit-booking/:id)
- Delete (delete-booking/:id)

We use MongoDB as our database.

## Installation

1. [Clone repo](https://github.com/MattSedmak/restaurant_server)
2. `npm i`
3. create a nodemon.json:

```
{
  "env": {
    "MONGO_USER": "your_username",
    "MONGO_PASSWORD": "your_pwd",
    "MONGO_DB": "your_database"
  }
}
```

4. `npm start`

## Naming conventions

- Variabel names should be descriptive and use camelCase
- Functions should be arrow functions (ES6), descriptive and the names in camelCase
- Interface names should always start with a capital I and PascalCase, eg. IBooking

## Comments

This is a school task in our REACT Course, where we will build a REACT app and our own Backend for our restaurant booking app.

We use TypeScript for the project to help us with production, it helps us by making sure that we are picking up on errors quickly and gives our project a solid structure.

LINK TO OUR REACT APP
