const mongo = require("../db");

// fungsi buat jaga-jaga kalau sudah ada table books
async function dropCollection() {
  try {
    // konek database
    const db = await mongo.connect();
    console.log("Drop Collection...");

    //drop database satu2
    await db.collection("books").drop();
    await db.collection("renter").drop();
  } catch (error) {
    console.log(error);
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

dropCollection();
