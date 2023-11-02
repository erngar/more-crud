const express = require('express')
const bodyParser = require('body-parser');
const { log, error } = require('console');
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://user2023:fall2023@cluster0.qenebhs.mongodb.net/?retryWrites=true&w=majority';

app.set('view engine','ejs')

//Body parser before CRUD handlers
// app.use(bodyParser.urlencoded({extended: true}))


//All handlers go here ...
// app.listen(3000, function(){
//     console.log('server on 3000 is active');
// })


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//   })

// app.post('/quotes', (req,res) => {
//     console.log('Hellooooooooooooooooooooooooo!');
//     console.log(req.body);

//     quotesCollection
//     .insertOne(req.body)
//     .then(result => {
//       console.log((result));
//     })
//     .catch(error => console.error(error))

//   })
app.use(express.static('public'))
app.use(bodyParser.json())

  
MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
  console.log('Connected to MondoDB');
  const db = client.db('book-quotes')
  const quotesCollection = db.collection('quotes')
  //express handlers
  app.use(bodyParser.urlencoded({extended: true}))
  //
  app.get('/', (req, res) => {
    /**  res.sendFile(__dirname + '/index.html')
    above line of code is only if you dont want
    to respond with html file */
    // const cursor = db.collection('quotes').find()
    // console.log(cursor);
    db.collection('quotes')
    .find()
    .toArray()
    .then(results => {
      console.log(results);
      res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.error(error))
    // res.render(view, locals)  
    // res.render('index.ejs',{ quotes:results})
    
  })

  //
  app.post('/quotes', (req,res) => {
    console.log('Hellooooooooooooooooooooooooo!');
    console.log(req.body);
    
    quotesCollection
    .insertOne(req.body)
    .then(result => {
      res.redirect('/')
      console.log((result));
    })
    .catch(error => console.error(error))
    //replace quote begin code here
    quotesCollection 
         .findOneAndUpdate(
           { name: 'Yoda'},
           {
             $set: {
               name: req.body.name,
               quote: req.body.quote,
             },
     
           },
           {
             upsert: true,
           }
            )
         .then(result => {
           console.log(result);
         })
         
         .catch(error => console.error(error))

  })
       app.put('/quotes',(req,res) =>{
        console.log(req.body);
       })
  //
  app.listen(3000, function(){
    console.log('server on 3000 is active');
})

})
.catch(error => console.log(error))

