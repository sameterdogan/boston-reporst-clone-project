import app from "./app"



const server= app.listen(process.env.PORT, (err) => {
    if (err) console.log("Server başlatılamadı. " + err);
    console.log("server başarıyla başlatıldı.")
})
global.io = require("socket.io")(server,{
    cors: {
        origin: '*',
    }
})

io.on("connect",socket=>{
    socket.on("message",(notes)=>{
        console.log(notes)
        io.emit("message",notes)
    })
    console.log("bağlantı sağlandı")
})
