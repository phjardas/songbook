import React from 'react';
import * as serviceWorker from '../serviceWorker';

export default class ServiceWorker extends React.Component {
  state = {
    contentUpdated: false,
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }

  componentDidMount() {
    serviceWorker.register({
      onUpdate: () => {
        console.info('Cached content has been updated.');
        this.setState({ contentUpdated: true });
      },
    });
  }
}
