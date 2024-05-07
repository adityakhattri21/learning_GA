import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Express from "express"
//doing the dotenv process
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);


if(process.env.NODE_ENV==='test'){
    dotenv.config({
        path: path.join(__dirname,`/.env.${process.env.NODE_ENV}`)
    })
}else{
    dotenv.config();
}


mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Connected to DB");
}).catch((error)=>{
    console.log(error);
})

const app = new Express();

app.use(Express.json());

app.use(
    Express.urlencoded({extended:true})
  );

const nameSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    }
});

const Names = mongoose.model("name",nameSchema);

const port = process.env.PORT || 3000;


app.get("/",(req,res,next)=>{
    res.status(200).json({message:"Working"})
})

app.get("/names",async (req,res,next)=>{
    const names = await Names.find();
    res.status(200).json({data:names}); 
});

app.post("/name",async(req,res,next)=>{
    const {name} = req.body;
     await Names.create({name});
    res.status(200).json({message:"Data added successfully"});
});

app.listen(port ,()=>{
    console.log(`Connected on port ${port}`);
})

export {
    app
}


// console.log(process.env.NODE_ENV)
// const test = ()=>{
//     console.log(process.env.TEST)
//     return `This is the test env ${process.env.TEST}`
// }

// function sum (a,b){
//     return a+b;
// }

// if(process.env.NODE_ENV === 'test'){
//     test();
// }

// export {
//     sum,
//     test
// }