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
  ));
