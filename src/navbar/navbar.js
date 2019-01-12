import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './navbar.scss';

class navbar extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isAuthenticated, logoutClicked } = this.props;
    const buildNavbar = () => {
      if (isAuthenticated) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem className='navs'>
              <NavLink tag={RRNavLink} to='/friends'><i className="fas fa-users fa-2x"></i></NavLink>
              <NavLink tag={RRNavLink} to='/messages'><i className="fas fa-comments fa-2x"></i></NavLink>
              <NavLink tag={RRNavLink} to='/events'><i className="fab fa-pied-piper-alt fa-2x"></i></NavLink>
              <NavLink tag={RRNavLink} to='/articles'><i className="fas fa-envelope-open-text fa-2x"></i></NavLink>
              <NavLink tag={RRNavLink} to='/weather'><i className="fas fa-cloud-showers-heavy fa-2x"></i></NavLink>
              <NavLink tag={RRNavLink} to='/auth' onClick={logoutClicked}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auto' navbar></Nav>;
    };
    return (
      <div className='myNavBar'>
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">React Nutshell</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
