import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  professional: String,
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
