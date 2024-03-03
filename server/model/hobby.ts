import mongoose from 'mongoose';

const hobbySchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Hobby = mongoose.model('Hobby', hobbySchema);
export default Hobby;
