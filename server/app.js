const express = require('express');
const mongo = require('mongodb').MongoClient
const cors = require("cors")

const app = express();


app.use(cors())


//MONGO CONNECT
const url = "mongodb://admin:password@localhost:27017"
let coll

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  //console.log("Connected")
  const db = client.db("trello")
  coll = db.collection("test")
})

app.get('/test', (req, res) => {
  res.send('ok')
  try {
    coll.insertOne({name: 'test', age: 'test'})
  } catch (e) {
    console.log(e)
  }
})

app.post('/test2', (req, res) => {
  console.log(res.json({requestBody: req.body}))
  //res.send("ok1")

})
app.listen(3000)
