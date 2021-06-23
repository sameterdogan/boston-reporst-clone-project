import app from "./app"

app.listen(process.env.PORT, (err) => {
    if (err) console.log("Server başlatılamadı. " + err);
    console.log("server başarıyla başlatıldı.")
})