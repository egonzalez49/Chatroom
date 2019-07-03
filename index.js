const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const Pusher = require('pusher');

const keys = require('./config/keys');

//local imports
require('./models/User');
require('./models/Chat');

require('./services/passport');

mongoose.connect(keys.mongoDataURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const app = express();

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
  useTLS: true
});
const channel = 'chats';

//listen for changes
const db = mongoose.connection;
db.once('open', () => {
  const chatCollection = db.collection('chats');
  const changeStream = chatCollection.watch({ fullDocument: 'updateLookup' });

  changeStream.on('change', change => {
    if (change.operationType === 'update') {
      const comment = change.fullDocument._id;
      pusher.trigger(channel, 'updated', {
        comment
      });
    }
  });
});

//middleware to parse incoming request bodies (req.body)
app.use(bodyParser.json());
app.use(formData.parse());

//app.use(methodOverride('_method'));

//middleware to use cookies with requests
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//passport middleware to initialize passport and use login sessions
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);
require('./routes/accountRoutes')(app);
require('./routes/chatRoutes')(app);

//express behaving in production (send unknown routes to client build)
if (process.env.NODE_ENV === 'production') {
  //serve up production assets like main.js or .css
  app.use(express.static('client/build'));
  //unknown route? return html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(5000);
