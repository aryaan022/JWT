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

const encrypt = (publickey,message)=>{
    const encrypted = crypto.publicEncrypt(publickey, Buffer.from(message))
    return encrypted.toString("base64")
}

const decrypt = (privateKey,encryptedMessage)=>{
    const decrypted= crypto.privateDecrypt(privateKey,Buffer.from(encryptedMessage,"base64"))
    return decrypted.toString("utf8")
}

const keys = generateKeys();

//save public key
fs.writeFileSync('./keys/public.pem', keys.publicKey);

// Save private key
fs.writeFileSync('./keys/private.pem', keys.privateKey);

const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get("/",(req,res)=>{
    res.send("hello")
});

app.post("/encrypt",(req,res)=>{
    const {message} =  req.body
    //operation for enccryption basically
    const ecncryptedData =  encrypt(publicKey,message)
    res.json({ecncryptedData})
})


app.post("/decrypt",(req,res)=>{
    const {encryptedMessage} =  req.body
    //operation for descrypted basically
    const decrypted = decrypt(privateKey,encryptedMessage);
    res.json({decrypted})
})


app.listen(5000,()=>{
    console.log("Server running on 5000");
})