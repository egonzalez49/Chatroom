import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';

import { sendComment, fetchChat } from '../../actions/chat';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import SpinnerComponent from '../SpinnerComponent';

class ChatContainer extends React.Component {
  componentDidMount() {
    //console.log(this.props.match.params.id);
    this.props.fetchChat(this.props.chatId);
  }

  onSubmit = comment => {
    this.props.sendComment(comment, this.props.chatId);
  };

  renderTags = tags => {
    return tags.map(tag => {
      return (
        <div key={tag} className="d-inline">
          <Badge
            className="ml-3 d-inline"
            style={{ backgroundColor: '#ff6361' }}
            pill
          >
            {tag}
          </Badge>
        </div>
      );
    });
  };

  render() {
    if (!this.props.chat) {
      return (
        <div>
          <SpinnerComponent />
        </div>
      );
    }

    return (
      <div className="chat-container">
        <div>
          <h2 className="d-inline">{this.props.chat.name}</h2>
          {this.renderTags(this.props.chat.tags)}
        </div>
        <CommentList chatId={this.props.chatId} />
        <CommentForm
          onSubmit={this.onSubmit}
          placeholder="Say hello!"
          buttonText="Send"
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
  { sendComment, fetchChat }
)(ChatContainer);
