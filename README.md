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

3. create pet to open adopt → endpoint put animal  --> criteria : make status animal adoption became false 


-----------------------------------------------------------------------------------------------------------------------


Info Role :
- Owner : Pemilik Took
- Adopter : Mengadop Hewan


TO DO LIST : 
# ROUTE  :
- Route CRUD animal 
- Route CRUD adopter 


Model :
# MODEL PET 
  1. fetchAlldata  ( user is adopter ) :   params —> status adoption, search animal name (ANSWER FOR LIST OPEN ADOPT PET IN ADOPTER ) 


# MODEL ADOPTER 
 1.  fetchAllData (user is owner ) :  params —> kategori animal,  ( ANSWER FOR LIST ADOPTER IN POST IN OWNER) 
 2. insertData (user is owner)  : params —>  user id, animal id  (ANSWER FOR APPROVE ADOPTER IN OWNER)
       Flow : 
        - check status adopter (user ) dan status adoption (animal) —> true(ga blh adopt) dan false(boleh adopt)
       — false : change status adopter user dan status adoption animal became true (status true) --> after that send to table adopter (send data nya kaya structure table adopter) 
   

# MODEL ANIMAL 
1. Make new function —> UpdateStatusDataPet (user is owner ) :  flow  —>  make status animal adoption became false , params —> id. body:{status:false}  (ANSWER CREATE PET TO OPEN ADOPT IN OWNER)

