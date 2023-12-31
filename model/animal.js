const mongo = require("../db");

//create table animal
async function insertData(animal) {
  try {
    const db = await mongo.connect();

    console.log("Inserting data...");

    //mengisi data  ke table animal
    return await db.collection("animal").insertMany(animal);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//get all table animal
async function fetchData() {
  try {
    const db = await mongo.connect();
    console.log("get data...");

    return await db.collection("animal").find({}, { projection:  { _id: 0 } }).toArray();
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//get 1 table data animal
async function fetchOneData(id) {
  try {
    const db = await mongo.connect();
    console.log("get 1 data...");

    return await db.collection("animal").findOne({ id: id }, { projection:  { _id: 0 } });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//update table animal
async function updateData(animal) {
  try {
    const db = await mongo.connect();
    console.log("Update data...");

    await db.collection("animal").updateOne(
      { id: animal.id },
      {
        $set: {
          id: animal.id,
          name: animal.name,
          category: animal.category,
          status_adoption: animal.status_adoption
        },
      }
    );
    return "data updated";
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

async function deleteData(id) {
  try {
    const db = await mongo.connect();
    console.log("Delete data...");

    await db.collection("animal").deleteOne({ id: id });
    return "data deleted";
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}
//mengekspor fungsi-fungsi agar dapat dipakai di file lain yang mengimport animal
module.exports = {
  insertData,
  fetchData,
  updateData,
  fetchOneData,
  deleteData,
};
