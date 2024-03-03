import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  comment: String,
  userId: String,
});

const Post = mongoose.model('Post', postSchema);
export default Post;
