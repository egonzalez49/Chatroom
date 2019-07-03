import React from 'react';
import { Media } from 'reactstrap';

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <Media>
        <Media left>
          <Media
            className="avatar-small"
            object
            src={comment.avatar}
            alt="Avatar"
          />
        </Media>
        <Media className="ml-3" body>
          <div>
            <h6 className="comment-name">
              {comment.firstName + ' ' + comment.lastName}
            </h6>
            <p className="comment-time">
              {new Date(comment.timeCreated).toLocaleTimeString()}
            </p>
          </div>
          <div className="chat-bubble">{comment.content}</div>
        </Media>
      </Media>
    </div>
  );
};

export default Comment;
