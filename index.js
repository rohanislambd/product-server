import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
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

const monggoClient =await connectToMongoDB();
const db = monggoClient.db("product-db");
const productCollection = db.collection("product")

// parse requests with a Content-Type of application/json
app.use(express.json())

//post 
app.post('/products',async(req, res) => {
    const data = req.body;
    
   const result =await productCollection.insertOne(data);
//    console.log(result);
    
   res.send(result)
})

 // Get all products from the database
app.get('/products', async(req, res) =>{
   const result = await  productCollection.find().toArray();
   res.send(result)
})

app.get("/", (req,res) => {
    res.send({
        mes: "Server is runnig"
    })
})


// sigle product get by id
app.get('/products/:id', async(req, res) => {
    const {id} = req.params;
    const result = await productCollection.findOne({_id: new ObjectId(id)})
    res.send(result)
})



//update data

app.patch("/products/:id", async(req, res) =>{

  const data = req.body;
  const {id} = req.params;
   const result =await productCollection.updateOne(
    {_id: new ObjectId(id)},
    {$set: data}
   )
    res.send(result)
})

// delete product 
app.delete("/products/:id", async(req,res)=>{
   const {id} = req.params;
   const result = await productCollection.deleteOne({_id: new ObjectId(id)})
   res.send(result)
})




//http://localhost:8000
app.listen(PORT, (req, res) =>{
   console.log(`Server is running at ${PORT}`);
})
