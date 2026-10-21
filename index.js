import express from "express";
const app = express();
const PORT = 8000;


app.get("/", (req,res) => {
    res.send({
        mes: "Server is runnig"
    })
})

//http://localhost:8000
app.listen(PORT, (req, res) =>{
   console.log(`Server is running at ${PORT}`);
})
