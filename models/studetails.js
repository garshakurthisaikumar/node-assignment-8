const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/studentrecords');

const Schema = mongoose.Schema;

const studentdetailsSchema = new Schema({

    id: { type:Number, required: true  , unique:true },
    name: {type:String, required: true },
    currentClass: {type:Number, required: true },
    division:{type:String, required: true },
  });
  
  const studentdetails = mongoose.model("Studentdetails", studentdetailsSchema);
  
  
  module.exports = studentdetails ;