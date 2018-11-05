import React from 'react';
import { NavLink as RRLink } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

export default function Layout({ children }) {
  return (
    <>
      <Navbar color="primary" dark className="navbar-expand">
        <Container>
          <NavbarBrand to="/" tag={RRLink}>
            Songbook
          </NavbarBrand>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
