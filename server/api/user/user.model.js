

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  lastName: String,
  password: String,
  birthDate: Date,
  age: Number,
  address: String,
  city: String,
  type: {
    type:String, enum: ['User', 'ONG']
  },
  country: String,
  email: String,
  description: String,
  web: String,
  facebook: String,
  twitter: String,
  instagram:String,
  linkedin: String,
  pendingProjects: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  acceptedProjects: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  position: {
    longitud: Number,
    latitud: Number
  },
  picPath     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.set('toJSON', { virtuals: true });
userSchema.virtual('imageURL').get(function() {
  if(this.picPath.includes('http')){
    return this.picPath;
  }
  return `http://localhost:3000${this.picPath}`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
