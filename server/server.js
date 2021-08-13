import app from "./app"



const server= app.listen(process.env.PORT,"0.0.0.0", (err) => {
    if (err) console.log("Server başlatılamadı. " + err);
    console.log("server başarıyla başlatıldı.")
})
global.io = require("socket.io")(server,{
    cors: {
        origin: '*',
    }
})

io.on("connect",socket=>{
    console.log("bağlandıı")
/*    socket.on("message",(notes)=>{
        io.emit("message",notes)
    })*/
    console.log("bağlantı sağlandı")
})
