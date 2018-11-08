import React from 'react';
import { firestore } from '../firebase';

export default class UserInfo extends React.Component {
  state = {
    loading: true,
    error: null,
    user: null,
  };

  render() {
    const { children } = this.props;
    const { loading, error, user } = this.state;
    if (loading) return <span className="text-muted">loading…</span>;
    if (error) return <span className="text-danger">Error: {error.message}</span>;
    return children(user);
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const doc = await firestore
        .collection('users')
        .doc(id)
        .get();
      const user = { ...doc.data(), id: doc.id };
      this.setState({ loading: false, error: null, user });
    } catch (error) {
      this.setState({ loading: false, error, user: null });
    }
  }
}
