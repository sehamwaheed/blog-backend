const path=require("path");
const  express = require("express");
const mongoose=require("mongoose");
const app = express();
const route = require("./router");

mongoose.connect('mongodb+srv://dinawaheed:23101997@cluster0.vw3rj.mongodb.net/blogs?retryWrites=true&w=majority',
{ useUnifiedTopology: true, useNewUrlParser: true,   useCreateIndex:true}).then((c) => {
    console.log('connect database')
});

app.use(express.json());
app.use('/images', express.static(path.join('images')));
app.use('/',route);

//if rout is wrong  then enter  the  error message
app.use((req, res,next) => {
    res.status(404).json({error:"NOT_FOUND"});
})


// if has error in  server enter this error handler
app.use((erro,req, res, next) => {
    // map error and send it to user to understand what happened
     // instansof
     //check if error is a mongoose error using instanceof
     
     if (erro instanceof mongoose.Error.ValidationError ) {
        
         res.status(422).json(erro.errors);
     }
});

const {Port=4000}=process.env;
app.listen(Port,()=>{
    console.log("your app lisen on Port :",Port);
})