import React from 'react';
import Helmet from 'react-helmet';
import { NavLink as RRLink } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from './FontAwesome';
import { WithAuth } from '../providers/Auth';

function Layout({ title, icon = 'music', back = '/songs', user, signOut, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s - Songbook" defaultTitle="Songbook">
        <title>{title}</title>
      </Helmet>
      <Navbar color="primary" dark fixed="top" className="navbar-expand">
        <Container>
          <NavbarBrand to={back} tag={RRLink}>
            <FontAwesome icon={icon} className="ml-3 mr-2" />
            {title || 'Songbook'}
          </NavbarBrand>

          {user && (
            <Nav navbar className="ml-auto">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesome icon="user" className="mr-2" />
                  {user.label}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={signOut}>Sign out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
      {children}
    </div>
  );
}

export default props => <WithAuth>{({ user, signOut }) => <Layout {...props} user={user} signOut={signOut} />}</WithAuth>;
