const mongo = require("../db");

// untuk menambahkan data atau seeding
async function seedData() {
  try {
    const db = await mongo.connect();
    console.log("Inserting data...");

    //fill data
    await db.collection("user").insertMany([
      {
        id: 1,
        name: "nadia",
        role: "owner",
        behaviour: "ramah",
        status_adopter: false,
      },
      {
        id: 2,
        name: "ratna",
        role: "adopter",
        behaviour: "tidak ramah",
        status_adopter: false,
      },
      {
        id: 3,
        name: "windi",
        role: "adopter",
        behaviour: "ramah",
        status_adopter: true,
      },
    ]);
    await db.collection("animal").insertMany([
      {
        id: 1,
        name: "mocca",
        category: "cat",
        status_adoption: false,
      },
      {
        id: 2,
        name: "kiwi",
        category: "rabbit",
        status_adoption: true,
      },
      {
        id: 3,
        name: "redOne",
        category: "cat",
        status_adoption: false,
      },
    ]);
     await db.collection("adopter").insertMany([
       {
         id: 1,
         user: {
           $id: 3,
           $name: "windi",
         },
         animal: {
           $id: 2,
           $name: "kiwi",
         },
       },
     ]);

    //close koneksi db
    await mongo.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seedData();
