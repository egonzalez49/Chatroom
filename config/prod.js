module.exports = {
  mongoDataURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  cloudKey: process.env.CLOUD_KEY,
  cloudSecret: process.env.CLOUD_SECRET,
  cloudName: 'chatroom',
  defaultAvatar:
    'https://res.cloudinary.com/chatroom/image/upload/v1561743211/default-avatar_plybka.png',
  pusherAppId: process.env.PUSHER_APP_ID,
  pusherKey: process.env.PUSHER_KEY,
  pusherSecret: process.env.PUSHER_SECRET,
  pusherCluster: 'us2'
};
