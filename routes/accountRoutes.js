const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const keys = require('../config/keys');
cloudinary.config({
  cloud_name: keys.cloudName,
  api_key: keys.cloudKey,
  api_secret: keys.cloudSecret
});

const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');

module.exports = app => {
  //edit user's account
  app.post('/api/account/edit', requireLogin, async (req, res) => {
    const values = Object.values(req.files)[0];

    const { firstName, lastName, password, newPassword } = req.body;

    const user = await User.findOne({ _id: req.user.id });

    if (!user.verifyPassword(password)) {
      res.status(200).send({ editError: 'Incorrect password' });
    } else {
      var image;
      var updateAvatar;
      var updatePassword;

      //upload image if there is one
      if (values) {
        image = await cloudinary.v2.uploader.upload(values.path);
        updateAvatar = image.url;
      } else {
        updateAvatar = req.user.avatar;
      }

      if (newPassword) {
        updatePassword = User.encryptPassword(newPassword);
      } else {
        updatePassword = user.password;
      }

      //find user, update fields, and return
      User.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          $set: {
            firstName,
            lastName,
            avatar: updateAvatar,
            password: updatePassword
          }
        },
        {
          fields: { password: false },
          new: true
        }
      )
        .exec()
        .then(data => {
          res.send(data);
        });
    }
  });
};
