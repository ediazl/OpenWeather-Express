const { MongoClient } = require("mongodb");

let dbConnection;

// Create a new MongoClient
const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    dbConnection = client.db("AirZone");
    // const test = database.collection("Test");
    // const result = await test.insertOne({
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const getDb = () => {
  return dbConnection;
};

run();

const getName = () => {
  return "Jim";
};

exports.getDb = getDb;
exports.dbConnection = dbConnection;
