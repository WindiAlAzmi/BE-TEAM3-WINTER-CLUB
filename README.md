# Sistem Adopt Pet

## stuktur data - table
1. user --> id, name, role(adopter, owner), behaviour(ramah, tidak ramah), status adopter(false, true)
2. Animal --> id, name, category (cat, rabbit), status adoption(false, true)
3. adopter --> id, user : {name, behaviour}, hewan : {id, name}


## Flow 
### General
1.CRUD User
2.CRUD Animal
3.CRUD Adopter

### Per Role
- For Adopter :
1. list open adopt pet —> endpoint get all  ---> criteria : animal has status adoption is false
2. search pet →  endpoint get all ---> criteria :  params animal name
3. pet detail info → endpoint get 1 pet → criteria : params id
4. get ownerr info → endpoint get 1 owner —> criteria :  params id

- For Owner : 
1. list adopter in post → endpoint get all  →  all people want to adopt pet -->  criteria : ( params animal category) → check if  params is cat or params is rabbit → result : data table adopter

2. approve adopter → endpoint post to data table adopter ---> criteria :  
    -- 1. cek status adopt user dan cek behaviour user :
      – true → ga boleh adopt 
     —> false → boleh adopt -->  
         → boleh adopt → change status adopter user dan status adoption animal became true (status true) --> after that send to table adopter : (params user, dan params hewan) 

3. create pet to open adopt → endpoint post  --> criteria : make status animal adoption became false 
