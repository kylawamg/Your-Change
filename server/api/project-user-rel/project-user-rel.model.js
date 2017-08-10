const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const relationSchema = new Schema({

  registered: {type:Boolean, default:false},
  projectId: {type:Schema.Types.ObjectId, ref:'Project'},
  userId: {type:Schema.Types.ObjectId, ref:'User'},
  status: {type: String,
    enum: ['Candidate', 'Accepted']}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;
