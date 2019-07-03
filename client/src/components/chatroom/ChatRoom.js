import _ from 'lodash';
import React from 'react';

import ChatContainer from './ChatContainer';

const ChatRoom = props => {
  console.log(props.match);
  var chatId;
  if (_.isEmpty(props.match.params)) {
    chatId = '5d169dfc63229345cc321f0f';
  } else {
    chatId = props.match.params.id;
  }

  return (
    <div className="mt-5 chatroom-div">
      <ChatContainer chatId={chatId} />
    </div>
  );
};

export default ChatRoom;
