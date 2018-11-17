import { Button, Snackbar, IconButton, withStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';

class ContentUpdatedBanner extends React.Component {
  state = { show: true };

  render() {
    const { classes } = this.props;
    const { show } = this.state;

    return (
      <Snackbar
        open={show}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        message="The application has been updated"
        action={[
          <Button key="reload" color="secondary" size="small" onClick={this.handleReload}>
            Reload
          </Button>,
          <IconButton key="close" color="inherit" onClick={this.handleClose} className={classes.close}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }

  handleReload = () => window.location.reload(true);
  handleClose = () => this.setState({ show: false });
}

const styles = ({ spacing }) => ({ close: { padding: spacing.unit / 2 } });

export default withStyles(styles)(ContentUpdatedBanner);
