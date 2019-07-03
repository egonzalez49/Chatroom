import React from 'react';
import { connect } from 'react-redux';

import CommentForm from '../chatroom/CommentForm';
import { searchChats } from '../../actions/chat';
import ChatList from './ChatList';

class DiscoverContainer extends React.Component {
  componentDidMount() {
    this.props.searchChats('');
  }

  onSubmit = word => {
    this.props.searchChats(word.content);
  };

  render() {
    return (
      <div className="chatroom-div">
        <h2>Discover a Chatroom</h2>
        <CommentForm
          onSubmit={this.onSubmit}
          placeholder="Search for a chatroom"
          buttonText="Search"
        />
        <ChatList />
      </div>
    );
  }
}

export default connect(
  null,
  { searchChats }
)(DiscoverContainer);
