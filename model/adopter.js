const mongo = require("../db");

//create table adopter
async function insertData(adopter) {
  try {
    const db = await mongo.connect();
    console.log("Inserting data...");

    //mengisi data  ke table adopter
    await db.collection("adopter").insertMany(adopter);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//get all table adopter
async function fetchData() {
  try {
    const db = await mongo.connect();
    console.log("get data...");

    await db.collection("adopter").find({}, { projection: {} }).toArray();
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//get 1 table data adopter
async function fetchOneData(id) {
  try {
    const db = await mongo.connect();
    console.log("get 1 data...");

    return await db
      .collection("adopter")
      .findOne({ id: id }, { projection: {} });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//update table adopter
async function updateData(adopter) {
  try {
    const db = await mongo.connect();
    console.log("Update data...");

    await db.collection("adopter").updateOne(
      { id: adopter.id },
      {
        $set: {
          id: adopter.id,
          user:adopter.user,
          animal:adopter.animal
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

    await db.collection("adopter").deleteOne({ id: id });
    return "data deleted";
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}
//mengekspor fungsi-fungsi agar dapat dipakai di file lain yang mengimport adopter
module.exports = {
  insertData,
  fetchData,
  updateData,
  fetchOneData,
  deleteData,
};
