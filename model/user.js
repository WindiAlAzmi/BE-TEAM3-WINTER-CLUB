const mongo = require("../db");

//create table user 
async function insertData(user) {
  try {
    const db = await mongo.connect();
    console.log("Inserting data...");

    //mengisi data  ke table user
    await db.collection("user").insertMany(user);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}

//get all table user
async function fetchData( ) {
    try {
        const db = await mongo.connect();
        console.log("get data...");

        await db.collection("user").find({}, { projection: {} }).toArray();
     
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

//get 1 table data user 
async function fetchOneData( id ) {
    try {
        const db = await mongo.connect();
        console.log("get 1 data...");

        return await db
            .collection("user")
            .findOne({id: id}, { projection: {} })
        
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}


//update table user
async function updateData(user) {

    try {
        const db = await mongo.connect();
        console.log("Update data...");

        await db.collection("users").updateOne(
          { id: user.id },
          {
            $set: {
              id: user.id,
              name: user.name,
              role: user.role,
              behaviour: user.behaviour,
              status_adopter: user.status_adopter
            },
          }
        );
        return "data updated"
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

async function deleteData(id) {
  try {
    const db = await mongo.connect();
    console.log("Delete data...");

    await db.collection("user").deleteOne({ id: id });
    return "data deleted";
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongo.disconnect();
    console.log("finished.");
  }
}
//mengekspor fungsi-fungsi agar dapat dipakai di file lain yang mengimport user 
module.exports = {
  insertData,
  fetchData,
  updateData,
  fetchOneData,
  deleteData,
};