import { Snackbar } from '@material-ui/core';
import * as React from 'react';

export default class CustomSnackbar extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={this.handleClose}
      >
        {children}
      </Snackbar>
    );
  }

  componentDidMount() {
    const { autoHideDuration = 6000 } = this.props;
    const timer = window.setTimeout(this.handleClose, autoHideDuration);
    this.setState({ open: true, timer });
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timer);
  }

  handleClose = () => {
    window.clearTimeout(this.state.timer);
    this.setState({ open: false, timer: undefined });
  };
}
