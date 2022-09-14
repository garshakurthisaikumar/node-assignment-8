const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/studentrecords');

const Schema = mongoose.Schema;

const studentsidSchema = new Schema({
    id: { type:Number, required: true  , unique:true },
  });
  

  module.exports = mongoose.model("studentids", studentsidSchema); 