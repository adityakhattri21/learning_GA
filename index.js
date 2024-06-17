import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Express from "express"
import {createClient} from "redis"
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

const client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URI,
        port: 16776
    }
})
.on('error',err => console.log('Redis Client Error', err))
.connect();

if(client.isOpen){
    console.log("Redis Connected")
}

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Connected to DB");
}).catch((error)=>{
    console.log(error);
})

if(process.env.TEST){
    console.log("*****",process.env.TEST,"*****")
}
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
    let names = await client.get("names");
    if(names){
        console.log("Cache Hit");
        return res.status(200).json({data:JSON.parse(names)})
    }else{
        console.log("Cache miss")
        names = await Names.find();
        await client.set("names",JSON.stringify(names))
        res.status(200).json({data:names}); 
    }
});

app.post("/name",async(req,res,next)=>{
    const {name} = req.body;
     await Names.create({name});
     await client.del("names");
    res.status(200).json({message:"Data added successfully"});
});

app.listen(port ,()=>{
    console.log(`Connected on port ${port}`);
})

export {
    app,
    Names
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