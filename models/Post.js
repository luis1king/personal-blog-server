const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const PostSchema = Schema({
  title: String,
  url: {
    type: String,
    unique: true
  },
  description: String,
  topic: String,
  img: String,
  minides: String,
  date: Date
});
PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);