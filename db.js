// Don't modify this part ##
// Library

// Config
const { MongoClient, ServerApiVersion } = require("mongodb");
const username = "testdb123";
const password = "test123";
const database = "pet";

// replace this uri with your own
const uri = `mongodb+srv://${username}:${password}@${database}.tgw9sm7.mongodb.net/`
const client = new MongoClient(uri);
// Don't modify this part ##

// App
console.log("App running!");
async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    return await client.db(database);
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function disconnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.close();
    console.log("Disconnected from database");
  } catch (err) {
    console.log("Error: ", err);
  }
}

// export fungsi agar dapat digunakan di file lain
module.exports = { connect, disconnect };
