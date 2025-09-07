const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const { type } = require('os');
const { format } = require('path');


const app = express();
app.use(express.json());

//generate rsa key pair

const generateKeys = ()=>{
    const {publicKey , privateKey} = crypto.generateKeyPairSync("rsa",{
        modulusLength:2048, //key ki lenght decide krege
        publicKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        },
        privateKeyEncoding:{
            type:"pkcs1", //format of storing rsa key how data is structured (the sequence of numbers that make up the key)
            format:"pem" // privacy enchanced mail is base64 encoding format used for encoding binary data 
        },
    })
    return {publicKey , privateKey}
} 

const keys = generateKeys();

//save public key
fs.writeFileSync('./keys/public.pem', keys.publicKey);

// Save private key
fs.writeFileSync('./keys/private.pem', keys.privateKey);


app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(5000,()=>{
    console.log("Server running on 5000");
})