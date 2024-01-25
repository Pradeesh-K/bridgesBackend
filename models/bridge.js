const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bridgeSchema = new Schema({
  images: [{ type: String }], // Array of image URLs
  cost: { type: Number,min: 0 },
  name:{type:String},
  durationMonths: { type: Number,min: 0 },
  architect: { type: String },
  gifOrVideo: { type: String }, // URL or file path for a gif or video
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: { type: Number },
  dislikes: { type: Number },
  description: {type: String},
  ifcLink:{type: String},
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:'Review'
}],
feedbacks:[{
  type:Schema.Types.ObjectId,
  ref:'Feedback'
}]
});

const Bridge = mongoose.model('Bridge', bridgeSchema);

module.exports = Bridge;