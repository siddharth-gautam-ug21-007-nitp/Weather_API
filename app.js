const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

//API usage

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

const query = req.body.cityName;
    const apiKey = "ac6edafd1eeeedac7092e012b6f28bd7";
    const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units="+ unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
                  const weatherData=JSON.parse(data);
                  console.log(weatherData);
                  const temp = weatherData.main.temp;
                
                  const weatherDesc = weatherData.weather[0].description;
                  const icon = weatherData.weather[0].icon;
                const imageURL =" https://openweathermap.org/img/wn/"+ icon +"@2x.png";
                
        res.write("<p>The Weather is currently "+ weatherDesc+"</p>");
        res.write("<h1>The Temperatue in " + query +" is " + temp +" degree celcius.</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send(); 

        });
       
    });
});
 





app.listen(3000,function(){
    console.log("Server is running on port  3000.");
});