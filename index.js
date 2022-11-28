const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares 
app.use(cors());
app.use(express.json());

// Mongodb

const uri =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.faz05ry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});


const run = async() => {
    try{
        const categoriesCollection = client.db('resaleProducts').collection('categories');

        app.get('/categories', async(req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });

        app.get('/category/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const products = await categoriesCollection.findOne(query);
            res.send(products);
        })
    }
    finally{}
}
run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Resale server running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





