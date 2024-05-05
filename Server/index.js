const express = require('express')
const app = express()
const port = process.env.PORT || 5000



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tonmoyahamed2009:tonmoytoma25@cluster0.mqvxskm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const dataCollection = client.db('JMARTData').collection('data');
        await client.connect();


        app.get('/alldata', async (req, res) => {
            const cursor = dataCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/alldata/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await dataCollection.findOne(query);
            res.send(result);
        })
        app.post('/alldata', async (req, res) => {
            const newCountry = req.body;
            console.log(newCountry);
            const result = await dataCollection.insertOne(newCountry);
            res.send(result);
        });

 


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('J Mart Store Server is Running')
})

app.listen(port, () => {
    console.log(`J Mart Store Server is Running on Port: ${port}`)
})