import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
});

const User = mongoose.model('User', userSchema);
export default User;
