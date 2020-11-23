import { createMuiTheme } from '@material-ui/core';
import { pink, amber } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: { primary: amber, secondary: pink, mode: 'dark' },
});
