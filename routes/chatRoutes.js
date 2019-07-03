const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const Chat = mongoose.model('chats');
const Comment = mongoose.model('comments');

module.exports = app => {
  //add a new comment
  app.post('/api/chat/:id', requireLogin, (req, res) => {
    const chatId = req.params.id;
    const { content } = req.body;
    const { firstName, lastName, avatar } = req.user;

    const newComment = new Comment({
      content,
      firstName,
      lastName,
      avatar,
      _user: req.user.id
    });

    Chat.findOneAndUpdate(
      {
        _id: chatId
      },
      {
        $push: {
          comments: newComment
        }
      },
      {
        new: true
      }
    )
      .exec()
      .then(data => {
        res.send(data);
      });
  });

  //return one chat room
  app.get('/api/chat/:id', async (req, res) => {
    const chatId = req.params.id;

    const chat = await Chat.find({ _id: chatId });
    res.send(chat);
  });

  //get array of all chat rooms
  app.get('/api/chat', async (req, res) => {
    const { search } = req.query;

    var chats;

    if (search) {
      chats = await Chat.find({ $text: { $search: search } }).select(
        '-comments'
      );
    } else {
      chats = await Chat.find({}).select('-comments');
    }

    res.send(chats);
  });

  //create a new chatroom
  app.post('/api/new/chat', requireLogin, (req, res) => {
    const { name, tags } = req.body;

    const newChat = new Chat({
      _user: req.user.id,
      name,
      tags
    });

    newChat.save(err => {
      if (err) {
        throw err;
      }

      res.send(newChat);
    });
  });
};
