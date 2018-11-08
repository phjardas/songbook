import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Alert, Button, Form, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { firestore } from '../firebase';
import { WithAuth } from '../providers/Auth';
import Error from './Error';
import FontAwesome from './FontAwesome';
import UserInfo from './UserInfo';

class SharedUser extends React.Component {
  state = { unsharing: false };

  render() {
    const { userId } = this.props;
    const { unsharing } = this.state;

    return (
      <ListGroupItem className=" d-flex justify-content-between align-items-center">
        <UserInfo id={userId}>{user => user.label}</UserInfo>
        {unsharing ? (
          <Button color="danger" outline disabled>
            <FontAwesome icon="spinner" className="fa-pulse" />
          </Button>
        ) : (
          <Button color="danger" size="sm" outline onClick={() => this.unshare(userId)}>
            <FontAwesome icon="trash" />
          </Button>
        )}
      </ListGroupItem>
    );
  }

  unshare = async userId => {
    this.setState({ unsharing: true });
    await this.props.unshareUser(userId);
  };
}

function SharedUsers({ userIds, unshareUser }) {
  return (
    <>
      <p>This song is currently shared with the following users:</p>
      <ListGroup>
        {userIds.map(userId => (
          <SharedUser key={userId} userId={userId} unshareUser={unshareUser} />
        ))}
      </ListGroup>
    </>
  );
}

class ShareUser extends React.Component {
  state = {
    users: null,
    options: [],
    pending: false,
    error: null,
    shared: null,
  };

  render() {
    const { users, options, pending, error, shared } = this.state;

    return (
      <div className="mt-3">
        <p>Enter the name of a user to share it:</p>
        <Form onSubmit={this.submit} inline className="mb-3">
          <AsyncTypeahead
            value={users}
            onSearch={this.search}
            options={options}
            onChange={users => this.setState({ users })}
            disabled={pending}
          />
          <Button className="ml-2" color="primary" disabled={pending || !users || !users.length}>
            {pending ? (
              <>
                <FontAwesome icon="spinner" className="fa-pulse" /> Sharing…
              </>
            ) : (
              'Share'
            )}
          </Button>
        </Form>
        {error && <Error error={error} />}
        {shared && (
          <Alert color="info">
            Shared with <strong>{shared.label}</strong>.
          </Alert>
        )}
      </div>
    );
  }

  search = async () => {
    const { sharedUserIds } = this.props;
    const { docs } = await firestore.collection('users').get();
    const options = docs.filter(doc => sharedUserIds.indexOf(doc.id) < 0).map(doc => ({ ...doc.data(), id: doc.id }));
    this.setState({ options });
  };

  submit = async e => {
    e.preventDefault();
    try {
      const { users } = this.state;
      const user = users[0];
      this.setState({ pending: true, error: null, shared: null });
      await this.props.shareUser(user.id);
      this.setState({ pending: false, error: null, shared: user, users: null });
    } catch (error) {
      this.setState({ pending: false, error, shared: null });
    }
  };
}

class ShareSong extends React.Component {
  state = {
    modalShown: false,
  };

  render() {
    const { song, user, ...rest } = this.props;
    const { modalShown } = this.state;

    const sharedUserIds = Object.keys(song.users)
      .filter(u => u !== user.id)
      .sort();

    return (
      <>
        <Button {...rest} onClick={this.toggleModal}>
          <FontAwesome icon="share-alt" className="mr-2" />
          Share
        </Button>
        <Modal isOpen={modalShown} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <FontAwesome icon="share-alt" className="mr-2" />
            Share Song
          </ModalHeader>
          <ModalBody>
            {sharedUserIds.length !== 0 ? (
              <SharedUsers userIds={sharedUserIds} unshareUser={this.unshareUser} />
            ) : (
              <p>You're not sharing this song yet.</p>
            )}

            <ShareUser sharedUserIds={sharedUserIds} shareUser={this.shareUser} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={this.toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

  toggleModal = () => this.setState({ modalShown: !this.state.modalShown });

  shareUser = async userId => {
    const {
      song: { id },
    } = this.props;
    const ref = firestore.collection('songs').doc(id);
    const doc = await ref.get();
    const users = { ...doc.data().users, [userId]: 'true' };
    await ref.update({ users });
  };

  unshareUser = async userId => {
    const {
      song: { id },
    } = this.props;
    const ref = firestore.collection('songs').doc(id);
    const doc = await ref.get();
    const users = { ...doc.data().users };
    delete users[userId];
    await ref.update({ users });
  };
}

export default props => <WithAuth>{({ user }) => <ShareSong {...props} user={user} />}</WithAuth>;
