import { withStyles } from '@material-ui/core';
import React from 'react';
import Layout from '../components/layout';
import Loading from '../components/Loading';

function LayoutLoader({ classes }) {
  return (
    <Layout>
      <Loading className={classes.loader} />
    </Layout>
  );
}

const styles = ({ spacing }) => ({
  loader: {
    padding: spacing.unit * 3,
  },
});

export default withStyles(styles)(LayoutLoader);
