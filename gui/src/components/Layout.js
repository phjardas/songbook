import React from 'react';
import Helmet from 'react-helmet';
import { NavLink as RRLink } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import FontAwesome from './FontAwesome';

export default function Layout({ title, icon = 'music', children }) {
  return (
    <div>
      <Helmet titleTemplate="%s - Songbook" defaultTitle="Songbook">
        <title>{title}</title>
      </Helmet>
      <Navbar color="primary" dark fixed="top" className="navbar-expand">
        <Container>
          <NavbarBrand to="/" tag={RRLink}>
            <FontAwesome icon={icon} className="ml-3 mr-2" />
            {title || 'Songbook'}
          </NavbarBrand>
        </Container>
      </Navbar>
      {children}
    </div>
  );
}
