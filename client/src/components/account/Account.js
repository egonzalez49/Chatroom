import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import Spinner from '../SpinnerComponent';

class Account extends React.Component {
  formatDate = date => {
    return new Date(date).toDateString();
  };

  render() {
    if (!this.props.user) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="account-div">
        <div className="mt-5 row row-account justify-content-center">
          <div className="col-4 text-center">
            <div className="center-image">
              <img
                src={this.props.user.avatar}
                className="avatar"
                alt="avatar"
              />
            </div>
            <h4 className="mt-2">
              {this.props.user.firstName + ' ' + this.props.user.lastName}
            </h4>
            <h6 className="mt-2">{this.props.user.email}</h6>
            <p className="mt-2 mb-2">
              Joined on: {this.formatDate(this.props.user.timeCreated)}
            </p>
            <Button tag={Link} to="/account/edit" className="button" block>
              Edit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Account);
