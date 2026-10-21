import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express();
const PORT = 8000;


//connect database 
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB()





app.get("/", (req,res) => {
    res.send({
        mes: "Server is runnig"
    })
})



//http://localhost:8000
app.listen(PORT, (req, res) =>{
   console.log(`Server is running at ${PORT}`);
})
