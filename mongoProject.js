const express=require('express')
const server=express()
const bodyParser = require('body-parser')


server.use(express.static('.'))
server.use(bodyParser.urlencoded({ extended : false }))



// Inclusion de Mongoose
const mongoose = require('mongoose')
//On se connecte
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true }, function(err) {
  if (err) {console.log('ERROR');
   throw err; }
  else{ console.log("connected")} 
});

// Création du schéma pour les users
const userSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    date :  Date,
  });


  // Création d'un model nommé usermodel apartir du schema  userSchema
  var utilisateur = mongoose.model('usermodel', userSchema);//1-nom 2-schema

server.post('/users',function(req,res){
    //console.log(req.body);
 
   const  { nom,prenom,date } = req.body    
    const obj ={ nom,prenom,date} 
  

    //création dune instance de model
    const newUser = new utilisateur(obj);
    newUser.save(function (err) {
      if (err) { throw err; }
      console.log('user ajouté avec succès !');
    });
    utilisateur.find(null, function (err, user) {
      if (err) { throw err; }

    });
   res.status(200).redirect('/forum.html')
   
})


server.get('/allUsers',function(req,res){
  utilisateur.find(null, function (err, user) {
    if (err) { throw err; }

    res.status(200).send(user)
})});

server.get('/delete/:nom',function(req,res){
  let pseudo = req.params.nom

  utilisateur.deleteMany({ nom : req.params.nom }, function (err) {
    if (err) { throw err; }
    res.status(200).send("user "+ pseudo +" was deleted")

  })
})

// update le nom
server.get('/update/:nom1,:nom2',function(req,res){
  let pseudo1 = req.params.nom1
  let pseudo2 = req.params.nom2
  
  utilisateur.updateMany({ nom : req.params.nom1 }, {$set : {nom : req.params.nom2 }},function (err) {
    if (err) { throw err; }
    res.status(200).send("le nom : "+ pseudo1 +" a été modifié par :" +pseudo2)

  })
})


server.listen(3003,function(req,res){
    console.log('3003');
    
})



/*

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users');
mongoose.connection.once('open',function(){
  console.log("yes")
}).on('error',function(error){
  console.log('error',error)
});*/



/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});*/

