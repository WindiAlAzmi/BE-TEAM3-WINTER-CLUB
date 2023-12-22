const mongo = require("../db");

//buat collection/table baru
async function createCollection() {
  try {
    const db = await mongo.connect();
    console.log("Create Collection...");

    //create table
    await db.createCollection("books");
    await db.createCollection("renter");

    // tambahkan createindex untuk membuat index unik agar tidak dapat menginput id yang sama
    await db.collection("books").createIndex({ id: 1 }, { unique: true });
    await db.collection("renter").createIndex({ id: 1 }, { unique: true });
  } catch (error) {
    console.log(error);
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

createCollection();
