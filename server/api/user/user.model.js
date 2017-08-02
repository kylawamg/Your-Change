

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  lastName: String,
  password: String,
  birthDate: Date,
  address: String,
  city: String,
  type: {
    type:String, enum: ['user', 'ong']
  },
  country: String,
  email: String,
  description: String,
  web: String,
  facebook: String,
  twitter: String,
  instagram:String,
  linkedin: String,
  projects: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  position: {
    longitud: Number,
    latitud: Number
  },
  imgUrl     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
