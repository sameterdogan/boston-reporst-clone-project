import app from "./app"

app.listen(4000, (err) => {
    if (err) console.log("Server başlatılamadı. " + err);
    console.log("server başarıyla başlatıldı.")
})