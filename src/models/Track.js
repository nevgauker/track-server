const mongoose = require('mongoose');

const pointScema = new mongoose.Schema({
  timeStamp: Number,
  coords : {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});


const trackSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name : {
    type: String,
    default: ''
  },
  locations: [pointScema]
});


mongoose.model('Track',trackSchema);
