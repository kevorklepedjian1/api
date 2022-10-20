//importing express,mongoose and dbconfig
const express = require('express');
const mongoose = require('mongoose');
const dbconfig = require('./config/db.config');
//importing auth and errors from middleware
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
//importing unless from express-unless
const {unless} = require('express-unless');
const bodyParser = require("body-parser");

const app = express();




  


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

//connexting to mongodb setting mongoose.promise to global so that it can be seen throughout the api
mongoose.Promise = global.Promise;
//connexting database to mongodb
mongoose.connect("mongodb+srv://kevork:123@cluster0.sgt9hzt.mongodb.net/?retryWrites=true&w=majority", 
{
    maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).then(
    () =>{
        console.log('dtabase is connected')
    },
    (error) => {
        console.log('databased not conected: ' + error);
    }
);



  
  


// object that gives the in comming object in json format
app.use(express.json());
app.use("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
  });

//intiallize routes
app.post('/login', require('./routes/users.routes'))




app.use(errors.errorHandler);


app.listen(process.env.port || 4000 , function(){
    console.log("ready to go");
})