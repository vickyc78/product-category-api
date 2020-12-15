let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String,
    enum: ["Enable", "Disable"],
    default: "Enable"
  }
});

module.exports = categorySchema;
