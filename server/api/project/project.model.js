const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  type: {
    type: String,
    enum: ['onSite', 'online', 'international']
  },
  address: String,
  description: String,
  deadLine: String,
  profile: String,
  tags: {
    type: [String],
    enum: ["animals", "art and culture", "community", "education", "environment", "sports", "tics", "homeless", "kids", "youth", "handicapped", "penitentiary", "mental healt"]
  },
  startDate: String,
  endDate: String,
  vacancies: Number,
  status: {
    type: String,
    enum: ['Admision', 'Desarrollo', 'Finalizado'],
    default: 'Admision'
  },
  volunteers: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  candidates: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  position: {
    longitud: Number,
    latitud: Number
  },
  imgUrl: {
    type: Array,
    default: ["https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"]
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
projectSchema.set('toJSON', { virtuals: true });
projectSchema.virtual('imageURL').get(function() {
  if(this.imgUrl.includes('http')){
    return this.imgUrl;
  }
return `${process.env.HOST}${this.imgUrl}`;
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
