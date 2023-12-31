const mongo = require("../db");

//create table user 
async function insertData(user) {
  console.log(typeof user, 'ini tipe data post userr');

  try {
    const db = await mongo.connect();
    console.log("Inserting data...");

    
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
async function fetchData( searchField, search ) {
    try {
        const db = await mongo.connect();
        
        if (searchField && search) {
            return await db
            .collection("user")
            //penggunaan [] pada key di find, untuk mengekstrasi value dari variabel untuk dijadikan key
            .find( { [searchField]:  new RegExp(search, 'i')}, { projection: { _id: 0 } })
            .toArray();
        } else {
            return await db
            .collection("user")
            .find({}, { projection: { _id: 0 } })
            .toArray();
        }
        //mengambil seluruh data pet dari table pets
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
            .findOne({id: id}, { projection: { _id: 0 } })
        
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

   console.log(user, 'ini userr');
   
    try {
        const db = await mongo.connect();
        console.log("Update data...");

         console.log(user, 'ini userr');
        await db.collection("user").updateOne(
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