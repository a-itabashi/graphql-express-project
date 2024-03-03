import mongoose from 'mongoose';

const hobbySchema = new mongoose.Schema({
  title: String,
  description: String,
});

const HobbyModel = mongoose.model('User', hobbySchema);
export default HobbyModel;
