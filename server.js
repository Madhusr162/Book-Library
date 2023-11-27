var express=require('express');
var app=express();
const mongoose=require('mongoose');
const {MONGODB_URL}=require('./config')

mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", ()=>{
    console.log("DB connected");
});
mongoose.connection.on('error',(error)=>{
    console.log("Not able to connect to DB");
});

app.use(express.json());


require('./Model/bookModel');

app.use(require('./Route/bookRoutes'));


app.listen(5000,()=>{
    console.log("server started");
})