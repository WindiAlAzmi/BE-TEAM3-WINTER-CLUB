const mongo = require("../db");

//buat collection/table baru
async function createCollection() {
  try {
    const db = await mongo.connect();
    console.log("Create Collection...");

    //create table
    await db.createCollection("user");
    await db.createCollection("animal");

    // tambahkan createindex untuk membuat index unik agar tidak dapat menginput id yang sama
    await db.collection("user").createIndex({ id: 1 }, { unique: true });
    await db.collection("animal").createIndex({ id: 1 }, { unique: true });
  } catch (error) {
    console.log(error);
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

createCollection();
