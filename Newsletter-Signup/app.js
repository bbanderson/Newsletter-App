const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us18.api.mailchimp.com/3.0/lists/4e4ffa9c39"
    const options = {
        method: "POST",
        auth: "bbanderson:f1c409cb8daa8b5c154f19facfe4c56b-us18"
    }
    const request = https.request(url, options, function(response) {
        response.on("data", data => {
            console.log(JSON.parse(data));
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
            // console.log(response);
            
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(3000, () => console.log("Server is started."));

// f1c409cb8daa8b5c154f19facfe4c56b-us18

// List ID 4e4ffa9c39