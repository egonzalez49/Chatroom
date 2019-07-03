const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  content: String,
  avatar: String,
  firstName: String,
  lastName: String
});

mongoose.model('comments', commentSchema);
