import { IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { MockAuthProvider } from './helpers';
import { withTheme } from './theme';

storiesOf('Layout', module)
  .addDecorator(withTheme)
  .add('user without picture', () => (
    <HashRouter>
      <MockAuthProvider user={{ displayName: 'Test User', email: 'test@example.com' }}>
        <Layout>
          <div style={{ background: 'green', color: 'white', padding: 16 }}>content</div>
        </Layout>
      </MockAuthProvider>
    </HashRouter>
  ))
  .add('user with picture', () => (
    <HashRouter>
      <MockAuthProvider
        user={{
          displayName: 'Test User',
          email: 'test@example.com',
          photoURL: 'https://avatars2.githubusercontent.com/u/1437300?s=400&v=4',
        }}
      >
        <Layout>
          <div style={{ background: 'green', color: 'white', padding: 16 }}>content</div>
        </Layout>
      </MockAuthProvider>
    </HashRouter>
  ))
  .add('long title', () => (
    <HashRouter>
      <MockAuthProvider user={{ displayName: 'Test User', email: 'test@example.com' }}>
        <Layout
          title="This is a long title that should not wrap even if it is too long"
          Actions={() => (
            <div style={{ display: 'flex' }}>
              <IconButton color="inherit">
                <AddIcon />
              </IconButton>
              <IconButton color="inherit">
                <AddIcon />
              </IconButton>
              <IconButton color="inherit">
                <AddIcon />
              </IconButton>
            </div>
          )}
        >
          <div style={{ background: 'green', color: 'white', padding: 16 }}>content</div>
        </Layout>
      </MockAuthProvider>
    </HashRouter>
  ));
