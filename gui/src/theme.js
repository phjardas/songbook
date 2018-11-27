import { createMuiTheme } from '@material-ui/core/styles';
import { amber, purple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: amber,
  },
});

if (process.env.NODE_ENV === 'development') console.log('theme:', theme);
