import React from 'react';
import { Route } from 'react-router-dom';

export default function NavLink({ exact, to, children }) {
  return (
    <Route exact={exact} path={to}>
      {({ match }) => children({ exact, to, selected: !!match })}
    </Route>
  );
}
