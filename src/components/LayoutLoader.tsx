import Layout from './layout';
import Loading from './Loading';

export default function LayoutLoader() {
  return (
    <Layout>
      <Loading sx={{ p: 3 }} />
    </Layout>
  );
}
