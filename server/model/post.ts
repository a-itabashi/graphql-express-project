import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  comment: String,
});

const PostModel = mongoose.model('User', postSchema);
export default PostModel;
