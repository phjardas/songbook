import Layout from './layout';
import Loading from './Loading';

export default function LayoutLoader() {
  return (
    <Layout>
      <Loading sx={{ py: 8 }} />
    </Layout>
  );
}
