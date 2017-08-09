const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const messageSchema = new Schema({

  subject: String,
  content: {type:String, required:true},
  to: {type:Schema.Types.ObjectId, ref:'User'},
  from: {type:Schema.Types.ObjectId, ref:'User'},
  read: {type: Boolean, default: false}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
