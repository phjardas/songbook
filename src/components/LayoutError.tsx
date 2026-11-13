import ErrorSnackbar from './ErrorSnackbar';
import Layout from './layout';

export default function LayoutError({ error }: { error: Error }) {
  return (
    <Layout>
      <ErrorSnackbar error={error} />
    </Layout>
  );
}
