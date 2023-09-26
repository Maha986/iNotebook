//to connect with the database through mongoose
// connection string from the mongodb compass is being used here

const mongoose=require('mongoose');
const mongoURI ="mongodb://127.0.0.1:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const mongodbConnect=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports=mongodbConnect;