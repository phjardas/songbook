import { Edit as EditIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

function EditMenuItem({ song, history, children }) {
  if (!song.meta.owned) return children(null);

  return children({
    Icon: EditIcon,
    label: 'Edit',
    onClick: () => history.push(`${song.meta.url}/edit`),
  });
}

export default withRouter(EditMenuItem);
