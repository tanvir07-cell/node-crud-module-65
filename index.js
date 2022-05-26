const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const ObjectId = require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());

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

    // Post api data to the mongoDb:
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    });

    // get api data from the mongoDb to the server side:
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);

      // post kora data gula object er moddeh theke jate ekti array er moddeh thake:
      const user = await cursor.toArray();
      res.send(user);
    });

    // get a individual update  user:
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // update a user:
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };

      const updatedDoc = {
        $set: { name: updatedUser.name, email: updatedUser.email },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );

      res.send(result);
    });

    // delete a user from the mongoDb :
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening to the port = ${port}`);
});
