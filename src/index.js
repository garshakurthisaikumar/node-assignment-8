const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;
const data = require('./InitialData');
const stdetails=require("../models/studetails.js");
const ids = require("../models/id.js");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

const dataloading = async ()=>{
    try{
  const dataofstudents = await stdetails.create(data);
  const ID = await ids.create({id:8})
    }catch(e){
   console.log("data loaded")
    }
}
dataloading();


app.get("/api/student", async (req, res) => {
    try {
      const userdata = await stdetails.find();
      res.json({
        status: "success",
        userdata,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  });

  app.get("/api/student/:id", async (req, res) => {
    try {
    const id = req.params.id;
      const userdata = await stdetails.find({id:id});
      res.json({
        status: "success",
        userdata,
      });
    } catch (e) {
      res.status(404).json({
        message: e.message,
      });
    }
  });
///////////
app.post("/api/student", async (req, res) => {
    try {
      const details = req.body;
      console.log(details)
      const id = await ids.findOne({_id:"6310df73238bd7ee7521446d"});
      const idNumber = Number(id.id);
      console.log(id);
      const updatedvalue = idNumber+1;
      const updatedid = await ids.updateOne({_id:"6310df73238bd7ee7521446d"},{id:updatedvalue});
      const userdata = await stdetails.create({id:idNumber, ...details });
      console.log(userdata)
      res.json({
        status: "success",
        userdata,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  });
  /////
  app.put("/api/student/:id", async (req, res) => {
    try {
    const id = req.params.id;
      const userdata = await stdetails.findOneAndUpdate({id:id},req.body,{runValidators:true ,new :true});
      res.json({
        status: "success",
        userdata,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  });
//////////
app.delete("/api/student/:id", async (req, res) => {
    try {
    const id = req.params.id;
    console.log(id)
      const userdata = await stdetails.findOneAndDelete({id:id});
      console.log(userdata)
      res.json({
        status: "success",
        userdata,
      });
    } catch (e) {
      res.status(404).json({
        message: "failure",
      });
    }
  });


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   