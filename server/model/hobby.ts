import mongoose from 'mongoose';

const hobbySchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
});

const Hobby = mongoose.model('Hobby', hobbySchema);
export default Hobby;
