const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = require('./Comment');

const chatSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  comments: [CommentSchema],
  tags: [
    {
      type: String
    }
  ]
});

chatSchema.index({ name: 'text' });

mongoose.model('chats', chatSchema);
