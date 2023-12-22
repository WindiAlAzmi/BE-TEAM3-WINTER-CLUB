// ctrl + ` => memunculkan terminal

const express = require("express");
const app = express();
const port = 3300;

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
  const users = await user.fetchData(searchField, search);
 res.status(200).json({ status: 'berhasil', data: users });


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

  if (_user === null) {
    // HTTP Status bisa baca di https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.status(404);
    res.json("user not found");
    return;
  }
  res.status(200).json({ status: 'berhasil', data: _user });

});
// curl -X POST http://localhost:3000/users --header "Content-Type: application/json" --data '{"title": "test", "author": "test"}'
app.post("/users", async (req, res) => {
  /** 
      Request body bisa diakses dari req.body
      request body bisa bermacam2 jenis, bisa json, bisa form, bisa xml, bisa plain text.
      Di ekspress perlu menginisiasi support tambahan untuk masing-masing jenis request body, seperti diatas
    */
  try {
    const userData = req.body;
        for (let i = 0; i < userData.length; i++) {
          const name = userData[i].name;
          if (!name || name === "") {
            res.status(422).send("name must be filled!");
            return;
          }
          const role = userData[i].role;
          if (!role || role === "") {
            res.status(422).send("role must be filled!");
            return;
          }
          const behaviour = userData[i].behaviour;
          if (!behaviour || behaviour === "") {
            res.status(422).send("behaviour must be filled!");
            return;
          }
          const status_adopter = userData[i].status_adopter;
          if (status_adopter === "") {
            res.status(422).send(" status_adopter  must be filled!");
            return;
          }
        }

    const _users = await user.insertData(userData);

    // res.status(201);
    // res.json({ status: "Created", data: _users });
     res.status(201).json({ status: 'berhasil', data: _users });
  } catch (err) {
     res.status(422).json({ error: err });

  }


});

// Untuk mencoba melihat response api ketika memangngil route "/"
// curl -X PUT http://localhost:3000/users/1 --header "Content-Type: application/json" --data '{"title": "The user of lost things, again"}'
app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role, behaviour, status_adopter } = req.body;

  console.log(status_adopter, 'ini status adopterr');


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


    const thatUser = await user.fetchOneData(id);
    console.log(thatUser, 'ini that userr');

    if (!thatUser) {
      res.status(404);
      res.json("user not found!");
      return;
    }

    if (name) {
      thatUser.name = name;
    }

    if (role) {
      thatUser.role = role;
    }

     if (behaviour) {
       thatUser.behaviour = behaviour;
     }
  
    
    thatUser.status_adopter = status_adopter;


    await user.updateData(thatUser);
 
    console.log(thatUser, 'ini that user')
   // res.json(thatUser);
   res.status(201).json({ status: 'berhasil', data: thatUser });

  } catch (err) {
    res.status(422).json({ error: err });

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
    res.status(200).json({ status: 'berhasil hapus user'});
  } catch (error) {
    res.status(422);
    res.json("tidak dapat delete buku");
  }
});

// curl -X GET http://localhost:3000/animals
app.get("/animals", async(req, res) => {
  const animals = await animal.fetchData();
   res.status(200).json({ status: 'berhasil', data: animals});
});

// curl -X GET http://localhost:3000/animals/1
app.get("/animals/:id", async(req, res) => {
  const id = parseInt(req.params.id);
  const _animal = await animal.fetchOneData(id);

  if(_animal === null) {
    res.status(404);
    res.json("Animal not found")
    return;
  }
   res.status(200).json({ status: 'berhasil', data: _animal});
})

// curl -X POST http://localhost:3000/animals --header "Content-Type: application/json" --data '{"name": "test", "category": "test", "status_adoption": false}'
app.post("/animals", async (req, res) => {
  try {
    const animalData = req.body;

    // validasi data
    for (let i = 0; i < animalData.length; i++) {
      const name = animalData[i].name;
      if (!name || name === "") {
      res.status(422).send("Name must be filled!");
      return;
    }

      const category = animalData[i].category;
      if (!category || category === "") {
      res.status(422).send("Category must be filled!");
      return;
    }

      const status_adoption = animalData[i].status_adoption;
      if (status_adoption === undefined) {
      res.status(422).send("Status adoption must be provided!");
      return;
    }
  } 
    const _animals = await animal.insertData(animalData); // Menggunakan animalData, sesuai dengan nama variabel di model
    // res.status(201);
    // res.json(_animals);
       res.status(200).json({ status: 'berhasil'});

  } catch (error) {
    res.status(422);
    res.json("Error: Unable to insert animal");
  }
});

app.put("/animals/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, status_adoption } = req.body;

  console.log(status_adoption, 'ini status adopter animals');

 try {

    if (name === "") {
      res.status(422);
      res.json("name can't be empty if updated!");
      return;
    }

    if (category === "") {
      res.status(422);
      res.json("category can't be empty if updated!");
      return;
    }

    if (status_adoption === "") {
      res.status(422);
      res.json("status_adopter  can't be empty if updated!");
      return;
    }

    const thatAnimal = await animal.fetchOneData(id);

    if (!thatAnimal) {
      res.status(404);
      res.json("user not found!");
      return;
    }

    if (name) {
      thatAnimal.name = name;
    }

    if (category) {
      thatAnimal.category = category;
    }


      console.log(thatAnimal, 'ini that animal sebelum adopter');

    thatAnimal.status_adoption = status_adoption;

      console.log(thatAnimal, 'ini that animal setelah adopter');

    await animal.updateData(thatAnimal);

    res.json(thatAnimal);

  } catch (error) {
    res.status(422);
    console.log("error", error);
    res.json("tidak dapat update  user");
  }
});

app.delete("/animals/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // mencari buku terlebih dahulu yang mau diupdate
    const thatAnimal = await animal.fetchOneData(id);

    //cek jika bukunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
    if (!thatAnimal) {
      res.status(404);
      res.json("animal not found!");
      return;
    }

    await animal.deleteData(id);
    res.json(animal);
  } catch (error) {
    res.status(422);
    res.json("tidak dapat delete hewan");
  }
});

// rute untuk adopter
app.get("/adopters", async (req, res) => {
  const adopters = await adopter.fetchData();
  res.json(adopters);
});

app.get("/adopters/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const _adopter = await adopter.fetchOneData(id);
 
  if (_adopter === null) {
    res.status(404);
    res.json("Adopter not found");
    return;
  }

  res.json(_adopter);
});

app.post("/adopters", async (req, res) => {
  try {
    const adopterData = req.body;

   let  {id, user, animal }  = adopterData;

    console.log(adopterData, 'ini adopter data');
    
    
    // lakukan insert jika semua validasi berhasil
    const _adopters = await adopter.insertData(adopterData); 
    res.status(201);
    res.json(_adopters);
  } catch (error) {
    console.log(error, 'ini error');
    res.status(422);
    res.json("Error: Unable to insert adopter");
  }
});

app.put("/adopters/:id", async (req, res) => {
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


    await adopter.updateData(thatAdopter);

    res.json(thatAdopter);
  } catch (error) {
    res.status(422);
    console.log("error", error);
    res.json("tidak dapat update  adopter");
  }
});

app.delete("/adopters/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // mencari buku terlebih dahulu yang mau diupdate
    const thatAdopter = await user.fetchOneData(id);

    //cek jika bukunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
    if (!thatAdopter) {
      res.status(404);
      res.json("adopter not found!");
      return;
    }

    await adopter.deleteData(id);
    res.json(adopter);
  } catch (error) {
    res.status(422);
    res.json("tidak dapat delete adopter");
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
