import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography, withStyles } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Authenticated } from '../providers/Auth';
import Logo from './Logo';

class Layout extends React.Component {
  state = {
    authMenuOpened: false,
  };

  render() {
    const { title, back, user, classes, children } = this.props;
    const { authMenuOpened, authMenuAnchor } = this.state;

    return (
      <>
        <Helmet titleTemplate="%s - Songbook" title={title} defaultTitle="Songbook">
          <body className={classes.body} />
        </Helmet>

        <AppBar position="static">
          <Toolbar>
            <Link to={back || '/'} className={classes.title}>
              {back ? <ChevronLeftIcon className={classes.titleIcon} /> : <Logo className={`${classes.logo} ${classes.titleIcon}`} />}
              <Typography variant="h6" color="inherit">
                {title || 'Songbook'}
              </Typography>
            </Link>

            <>
              <IconButton onClick={this.toggleAuthMenu} color="inherit">
                {user.photoURL ? (
                  <Avatar src={user.photoURL} />
                ) : (
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={authMenuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={authMenuOpened}
                onClose={this.closeAuthMenu}
              >
                {user.displayName && <MenuItem>{user.displayName}</MenuItem>}
                {user.email && <MenuItem>{user.email}</MenuItem>}
                <MenuItem onClick={this.signOut}>SignOut</MenuItem>
              </Menu>
            </>
          </Toolbar>
        </AppBar>

        {children}
      </>
    );
  }

  toggleAuthMenu = event => {
    event.preventDefault();
    this.setState({ authMenuOpened: !this.state.authMenuOpened, authMenuAnchor: event.currentTarget });
  };

  closeAuthMenu = () => this.setState({ authMenuOpened: false, authMenuAnchor: undefined });

  signOut = () => {
    this.closeAuthMenu();
    this.props.signOut();
  };
}

const styles = ({ spacing }) => ({
  body: {
    background: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'flex',
    color: 'inherit',
    flexGrow: 1,
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    marginRight: spacing.unit,
  },
  titleIcon: {
    width: '1.2em',
    height: '1.2em',
  },
});

const StyledLayout = withStyles(styles)(Layout);

export default props => <Authenticated>{({ user, signOut }) => <StyledLayout {...props} user={user} signOut={signOut} />}</Authenticated>;
