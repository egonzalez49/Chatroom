import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import AppNav from './AppNav';
import ChatRoom from './chatroom/ChatRoom';
import JoinContainer from './join/JoinContainer';
import Account from './account/Account';
import EditAccount from './account/EditAccount';
import About from './About';
import DiscoverContainer from './discover/DiscoverContainer';
import Footer from './Footer';
import { fetchUser } from '../actions';
import CreateChat from './create/CreateChat';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <AppNav />
            <Route path="/" exact component={ChatRoom} />
            <Route path="/" exact component={About} />
            <Route path="/join" exact component={JoinContainer} />
            <Route path="/account" exact component={Account} />
            <Route path="/discover" exact component={DiscoverContainer} />
            <Route path="/account/edit" exact component={EditAccount} />
            <Route path="/chat/:id" exact component={ChatRoom} />
            <Route path="/create" exact component={CreateChat} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
