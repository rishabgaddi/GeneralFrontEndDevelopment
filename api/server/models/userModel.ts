import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Enter an email"],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    trim: true,
    min: [6, "Your passowrd must be atleast 6 characters"]
  },
  todos: [{ type: mongoose.Types.ObjectId, ref: 'Todo'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('User', userSchema);