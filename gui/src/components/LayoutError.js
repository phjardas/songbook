import React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/layout';

export default function({ error }) {
  return (
    <Layout>
      <ErrorSnackbar error={error} />
    </Layout>
  );
}
