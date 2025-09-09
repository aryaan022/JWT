const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");

const server = http.createServer((req,res)=>{
    console.log((new Date())+"Recived req for"+req.url);
    res.end("hii there")
})

const wss = new WebSocketServer({server});

wss.on("connection",function connection(ws){
    ws.on("error",console.error);

    ws.on("message",function message(data,isBinary){

        wss.clients.forEach(function each(client){

            if(client.readyState === WebSocket.OPEN){
                
                client.send(data,{binary:isBinary})
            }
        })
    });
    ws.send("hello connection mesage from ws server");
})


server.listen(8080,()=>{
    console.log((new Date())+"Server is listing on port 8080");
})