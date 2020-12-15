let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String,
    enum: ["Enable", "Disable"],
    default: "Enable"
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true
  }
});

module.exports = productSchema;
