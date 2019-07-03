import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class AppNav extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  scroll = () => {
    const element = document.getElementById('about');
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  };

  renderContent = () => {
    switch (this.props.auth.user) {
      case null:
        return;
      //no user logged in
      case '':
        return (
          <React.Fragment>
            <NavItem>
              <NavLink className="link" tag={Link} to="/join">
                login
              </NavLink>
            </NavItem>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <NavItem>
              <NavLink className="link" tag={Link} to="/create">
                create chatroom
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="link" tag={Link} to="/account">
                account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="link" href="/auth/logout">
                logout
              </NavLink>
            </NavItem>
          </React.Fragment>
        );
    }
  };

  render() {
    return (
      <div className="app-nav">
        <Navbar expand="md">
          <NavbarBrand>chatroom</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="link" tag={Link} to="/">
                  home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink smooth className="link" tag={HashLink} to="/#about">
                  about
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="link" tag={Link} to="/discover">
                  discover
                </NavLink>
              </NavItem>
              {this.renderContent()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AppNav);
