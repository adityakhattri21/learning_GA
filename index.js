import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
//doing the dotenv process
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
console.log(__dirname,`/env.${process.env.NODE_ENV}`)
if(process.env.NODE_ENV==='test'){
    dotenv.config({
        path: path.join(__dirname,`/.env.${process.env.NODE_ENV}`)
    })
}else{
    dotenv.config();
}

console.log(process.env.NODE_ENV)
const test = ()=>{
    console.log(process.env.TEST)
    return `This is the test env ${process.env.TEST}`
}

function sum (a,b){
    return a+b;
}

if(process.env.NODE_ENV === 'test'){
    test();
}

export {
    sum,
    test
}