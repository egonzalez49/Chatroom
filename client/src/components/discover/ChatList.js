import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

import SpinnerComponent from '../SpinnerComponent';

class ChatList extends React.Component {
  renderChats = () => {
    return this.props.list.map(item => {
      return (
        <ListGroupItem key={item._id} className="justify-content-between">
          {item.name}
          {this.renderTags(item.tags)}
          <Link className="float-right no-margin" to={`/chat/${item._id}`}>
            Enter
          </Link>
        </ListGroupItem>
      );
    });
  };

  renderTags = tags => {
    return tags.map(tag => {
      return (
        <Badge
          key={tag}
          className="ml-3"
          style={{ backgroundColor: '#ff6361' }}
          pill
        >
          {tag}
        </Badge>
      );
    });
  };

  render() {
    if (!this.props.list) {
      return (
        <div>
          <SpinnerComponent />
        </div>
      );
    }

    return <ListGroup>{this.renderChats()}</ListGroup>;
  }
}

const mapStateToProps = state => {
  return {
    list: state.search
  };
};

export default connect(mapStateToProps)(ChatList);
