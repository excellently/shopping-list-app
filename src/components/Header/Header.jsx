import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink } from 'reactstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Navbar color='light' light expand='sm'>
        <NavbarToggler onClick={this.handleToggle} />
        <Collapse className='justify-content-center' isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <IndexLinkContainer to='/'>
              <NavLink>
              Главная
              </NavLink>
            </IndexLinkContainer>
            <LinkContainer to='/shopping-lists'>
              <NavLink>
              Списки покупок
              </NavLink>
            </LinkContainer>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;

