const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    default: null,
    type: String,
    trim: true,
    required: false,
  },
    contactName: { type: String, trim: true, required: false, default: null},
    street: { type: String, trim: true, required: false, default: null},
    apartment: { type: String, trim: true, required: false, default: null },
    region: { type: String, trim: true, required: false, default: null },
    city: { type: String, trim: true, required: false, default: null },
    zipCode: { type: String, trim: true, required: false, default: null },
    searchAddress: { type: String, trim: true, required: false, default: null },
    
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
