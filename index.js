import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config'
import cors from "cors"

const app = express();
const PORT = 8000;


// cors
app.use(cors())

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

connectToMongoDB();

// parse requests with a Content-Type of application/json
app.use(express.json())

//post 
app.post('/products',(req, res) => {
    const data = req.body;
   console.log(data);
   res.send({mes: "Api is working"})
})



app.get("/", (req,res) => {
    res.send({
        mes: "Server is runnig"
    })
})



//http://localhost:8000
app.listen(PORT, (req, res) =>{
   console.log(`Server is running at ${PORT}`);
})
