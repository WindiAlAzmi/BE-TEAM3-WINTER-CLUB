const mongo = require("../db");

// untuk menambahkan data atau seeding
async function seedData() {
  try {
    const db = await mongo.connect();
    console.log("Inserting data...");

    //fill data
    await db.collection("user").insertMany([
      {
        id: 4,
        name: "nadia",
        role: "owner",
        behaviour: "ramah",
        status_adopter: false,
      },
      {
        id: 5,
        name: "ratna",
        role: "adopter",
        behaviour: "tidak ramah",
        status_adopter: false,
      },
      {
        id: 6,
        name: "windi",
        role: "adopter",
        behaviour: "ramah",
        status_adopter: true,
      },
    ]);
    await db.collection("animal").insertMany([
      {
        id: 4,
        name: "mocca",
        category: "cat",
        status_adoption: false,
      },
      {
        id: 5,
        name: "kiwi",
        category: "rabbit",
        status_adoption: true,
      },
      {
        id: 6,
        name: "redOne",
        category: "cat",
        status_adoption: false,
      },
    ]);
     await db.collection("adopter").insertMany([
       {
         id: 3,
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
