const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // res.send(req.body.lastName)
    console.log("POST");
    console.log(firstName, lastName, email);
    
    
})

app.listen(3000, () => console.log("Server is started."));

// f1c409cb8daa8b5c154f19facfe4c56b-us18

// List ID 4e4ffa9c39