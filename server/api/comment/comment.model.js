const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({

  content: {type:String, required:true},
  project: {type:Schema.Types.ObjectId, ref:'Project'},
  creator: {type:Schema.Types.ObjectId, ref:'User'},

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
