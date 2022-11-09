const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-91bempp-shard-00-00.43r3m3i.mongodb.net:27017,ac-91bempp-shard-00-01.43r3m3i.mongodb.net:27017,ac-91bempp-shard-00-02.43r3m3i.mongodb.net:27017/?ssl=true&replicaSet=atlas-ovqv5y-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const minionCollection = client
      .db('Minions')
      .collection('minionCollection');

    //  creating minions
    app.post('/create', async (req, res) => {
      const minionObject = req.body;
      const result = await minionCollection.insertOne(minionObject);
      res.send(result);
    });
      

  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Minions server is running');
});

app.listen(port, () => {
  console.log('listing  to port', port);
});
