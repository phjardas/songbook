import React from 'react';
import { NavLink as RRLink } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import FontAwesome from './FontAwesome';

export default function Layout({ title = 'Songbook', icon = 'music', children }) {
  return (
    <>
      <Navbar color="primary" dark fixed="top" className="navbar-expand">
        <Container>
          <NavbarBrand to="/" tag={RRLink}>
            <FontAwesome icon={icon} className="ml-3 mr-2" />
            {title}
          </NavbarBrand>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
