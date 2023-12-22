// ctrl + ` => memunculkan terminal

const express = require("express");
const app = express();
const port = 3000;

//import file user yang berisikan fungsi2 yang diexport
const user = require("./model/user");
const animal = require("./model/animal");
const adopter = require("./model/adopter");



// membuat express dapat menerima request body berupa JSON
app.use(express.json());

// curl -X GET http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// curl -X GET http://localhost:3000/users
// jika pakai postman gunakan http://localhost:3000/user saja
app.get("/users", async (req, res) => {
  //mengambil query yang dikirim
  const { searchField, search } = req.query;
  
  //mengambil data dengan fungsi fetchData
  const users = await user.fetchData();
  console.log(users, 'ini users');
  res.json(users);
});

/** 
  Request Parameters
  ada 2 jenis:
  1. Path parameters ditandai dengan simbol :nama_param
  2. Query parameters ditandai dengan simbol ?nama_param=value
*/
// curl -X GET http://localhost:3000/users/1

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const _user = await user.fetchOneData(id);

  //jika buku tidak ada
  if (_user === null) {
    // HTTP Status bisa baca di https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.status(404);
    res.json("user not found");
    return;
  }

  res.json(_user);
});

// curl -X POST http://localhost:3000/users --header "Content-Type: application/json" --data '{"title": "test", "author": "test"}'
app.post("/users", async (req, res) => {
  /** 
      Request body bisa diakses dari req.body
      request body bisa bermacam2 jenis, bisa json, bisa form, bisa xml, bisa plain text.
      Di ekspress perlu menginisiasi support tambahan untuk masing-masing jenis request body, seperti diatas
    */
  try {
    const user = req.body;

    for (let i = 0; i < user.length; i++) {
      const name = user[i].name;
      if (!name || name === "") {
        res.status(422).send("name must be filled!");
        return;
      }
      const role = user[i].role;
      if (!role || role === "") {
       res.status(422).send("role must be filled!");
       return;
     }
       const behaviour = user[i].behaviour;
       if (!behaviour || behaviour === "") {
         res.status(422).send("behaviour must be filled!");
         return;
       }
        const status_adopter = user[i].status_adopter;
         if (!status_adopter || status_adopter === "") {
           res.status(422).send(" status_adopter  must be filled!");
           return;
         }
    }

    const _users = await user.insertData(users);
    res.status(201);
    res.json(_users);
  } catch (error) {
    res.status(422);
    res.json(`buku dengan id tersebut sudah ada`);
  }
});

// Untuk mencoba melihat response api ketika memangngil route "/"
// curl -X PUT http://localhost:3000/users/1 --header "Content-Type: application/json" --data '{"title": "The user of lost things, again"}'
app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role, behaviour, status_adopter } = req.body;
  try {

    if (name === "") {
      res.status(422);
      res.json("name can't be empty if updated!");
      return;
    }

    if (role === "") {
      res.status(422);
      res.json("role can't be empty if updated!");
      return;
    }

    if (behaviour === "") {
      res.status(422);
      res.json("behaviour can't be empty if updated!");
      return;
    }

    if (status_adopter === "") {
      res.status(422);
      res.json("status_adopter  can't be empty if updated!");
      return;
    }

    // mencari buku terlebih dahulu yang mau diupdate

    const thatUser = await user.fetchOneData(id);

    //cek jika bukunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
    if (!thatUser) {
      res.status(404);
      res.json("user not found!");
      return;
    }

    // di validasi dulu apakah  name diberikan di req.body, kalau tidak, tidak perlu di update biar tidak null hasilnya
    if (name) {
      thatUser.name = name;
    }

    // role   di validasi dulu apakah role  diberikan di req.body, kalau tidak, tidak perlu di update biar tidak null hasilnya
    if (role) {
      thatUser.role = role;
    }

     if (behaviour) {
       thatUser.behaviour = behaviour;
     }

     
     if (status_adopter) {
       thatUser.status_adopter = status_adopter;
     }


    await user.updateData(thatUser);

    res.json(thatUser);
  } catch (error) {
    res.status(422);
    console.log("error", error);
    res.json("tidak dapat update buku");
  }
});

// Untuk mencoba melihat response api ketika memangngil route "/"
// curl -X DELETE http://localhost:3000/users/1
app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // mencari buku terlebih dahulu yang mau diupdate
    const thatUser = await user.fetchOneData(id);

    //cek jika bukunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
    if (!thatUser) {
      res.status(404);
      res.json("user not found!");
      return;
    }

    await user.deleteData(id);
    res.json(user);
  } catch (error) {
    res.status(422);
    res.json("tidak dapat delete buku");
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
