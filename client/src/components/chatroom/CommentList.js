import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';

import Comment from './Comment';
import Spinner from '../SpinnerComponent';
import { fetchChat } from '../../actions/chat';

class CommentList extends React.Component {
  el = document.getElementById('scroll');
  isScrolledToBottom = true;

  componentDidMount() {
    this.props.fetchChat(this.props.chatId);

    //Pusher.logToConsole = true;
    this.pusher = new Pusher('558eda2ee66f1db13b01', {
      cluster: 'us2',
      forceTLS: true
    });

    this.channel = this.pusher.subscribe('chats');

    this.channel.bind('updated', this.addComments);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('chats');
  }

  addComments = () => {
    this.setBoolean();
    this.props.fetchChat(this.props.chatId);
  };

  renderComments() {
    return _.map(this.props.chat.comments, comment => {
      return <Comment key={comment._id} comment={comment} />;
    });
  }

  setBoolean = () => {
    this.el = document.getElementById('scroll');
    this.isScrolledToBottom =
      this.el.scrollHeight - this.el.clientHeight <= this.el.scrollTop + 1;
  };

  scrollToBottom = () => {
    if (this.isScrolledToBottom)
      this.messagesEnd.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
  };

  render() {
    if (!this.props.chat) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return (
      <div id="scroll" className="mb-3 chat-list">
        {this.renderComments()}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chat: state.chat
  };
};

export default connect(
  mapStateToProps,
  { fetchChat }
)(CommentList);
