const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")
const https=require("https")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.eM;
    console.log(firstName+lastName+email)
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    "FNAME":firstName,
                    "LNAME":lastName,
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/d654092cd7";
    const options = {
        method:"POST",
        auth:"abs12:3bdc71e9470248f786d866d6507c793a-us9"
        

    }
    const request = https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("server started at port 3000:")
}) 


// d654092cd7
// 3bdc71e9470248f786d866d6507c793a-us9