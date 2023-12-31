
const express = require('express');
const app = express();
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const gallery =require ('./Data/Gallery.json')





app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS)





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.awbfykh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const GalleryCollection =client.db('Toy-Trove').collection('Gallery');
    app.get('/gallery', async (req, res) => {
     const cursor=GalleryCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })

    const toyCollection =client.db('Toy-Trove').collection('toy');
    app.get('/toy', async (req, res) => {
     const cursor=toyCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })


    app.get('/toy/:_id', async (req, res) => {
      const _id=req.params._id;
      const query={_id: new ObjectId(_id)}

      // const option={
      //   projection:{Picture:1, ToyName:1, SellerName:1, SellerEmail:1, price:1, rating:1,  AvailableQuantity:1,Description:1}
      // }
       const result =await toyCollection.findOne(query);
       res.send(result);
    })


    const Add_A_ToyCollection=client.db('Toy-Trove').collection('Add_A_Toy');


    app.get('/Add_A_Toy', async (req, res) => {
      console.log(req.query.email);
      let query={};
      if(req.query?.email){
        query={ email: req.query.email}
        
      }
     
      const result= await Add_A_ToyCollection.find(query).toArray();
      res.send(result);
    })


    


    app.post('/Add_A_Toy',async(req,res)=>{
      
        const add_A_toy=req.body;
        console.log(add_A_toy);
        const result=await Add_A_ToyCollection.insertOne(add_A_toy);
        res.send(result);
  
  
        
    });


    


    const Toy_SCollection =client.db('Toy-Trove').collection('Toy_S');
    app.get('/Toy_S', async (req, res) => {
     const cursor=Toy_SCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    });

    app.get('/Toy_S/:_id', async (req, res) => {
      const _id=req.params._id;
      const query={_id: new ObjectId(_id)}

      // const option={
      //   projection:{Picture:1, ToyName:1, SellerName:1, SellerEmail:1, price:1, rating:1,  AvailableQuantity:1,Description:1}
      // }
       const result =await Toy_SCollection.findOne(query);
       res.send(result);
    });

  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Viewers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
