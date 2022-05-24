const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("First Node server ");
});

//mongoDb userName : tanvir07
// mongoDb password :xE1pz5Y594gVqPgL

const uri =
  "mongodb+srv://tanvir07:xE1pz5Y594gVqPgL@cluster0.runn8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");
    const user = { name: "Tanvir Rifat", email: "tanvir@gmail.com" };
    const result = await userCollection.insertOne(user);
    console.log(`A user was inserted with the _id: ${result.insertedId}`);
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening to the port = ${port}`);
});
