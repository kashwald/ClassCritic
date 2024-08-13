const express = require("express");
const router = express.Router();

//Get functions from credentialscontroller
const{
    createUser,
    validateUser,
} = require("../controllers/credentialsController")

//Used to create a new user from registration page
router.post("/", createUser);

//Used to validate a pre-existing user from login page
router.post("/login", validateUser);

//export all routes as it pertains to login and registration
module.exports = router;