const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false }));




// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shadinotaBatch:tanim151452@cluster0.9c7m8.mongodb.net/battlesofbiology?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const zoology = client.db("battlesofbiology").collection("zoology");
  const botany = client.db("battlesofbiology").collection("botany");
 
  app.post('/zooadminsadab', (req, res) => {
    const zooDetails = req.body;
    console.log('adding new zoology class ', zooDetails)
    zoology.insertOne(zooDetails)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
  })
  app.get('/zooclass', (req, res) => {
      zoology.find({})
    .toArray((err, docs) => {
        res.send(docs)
    })
  })
  //zoo update
app.put('/zooexam/:id', (req, res) => {
  zoology.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:req.body})
 .then(data =>res.json(data.value))
})
app.get('/zooexam/:id', (req, res) => {
  zoology.findOne({_id:ObjectId(req.params.id)})
 .then(data =>res.json(data))

})

//botany full code

app.post('/boadminsadab', (req, res) => {
  const boDetails = req.body;
  console.log('adding new zoology class ', boDetails)
  botany.insertOne(boDetails)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})
app.get('/boclass', (req, res) => {
    botany.find({})
  .toArray((err, docs) => {
      res.send(docs)
  })
})
//zoo update
app.put('/boexam/:id', (req, res) => {
botany.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:req.body})
.then(data =>res.json(data.value))
})
app.get('/boexam/:id', (req, res) => {
botany.findOne({_id:ObjectId(req.params.id)})
.then(data =>res.json(data))

})
console.log("connected");
});



app.get('/', (req,res)=>{
    res.send('im working')
})


app.listen(`${port}`)



