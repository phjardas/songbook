import { Button } from '@mui/material';
import { Link } from 'react-router';

export default function ButtonLink({ Component = Button, ...props }) {
  return <Component component={Link} {...props} />;
}
