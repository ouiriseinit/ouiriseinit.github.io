// models/Message.js
import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema) || Message