const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'default-tour.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tour', tourSchema); 