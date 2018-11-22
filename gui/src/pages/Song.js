import { withStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import Song from '../components/Song';
import { firestore } from '../firebase';
import { withAuth } from '../providers/Auth';
import { withPageData } from '../providers/PageData';

function SongWrapper({ user, songId, setPageData, classes }) {
  const [{ loading, error, song }, setState] = useState({ loading: true });

  useEffect(
    () => {
      setPageData({ back: '/', fab: null });

      return firestore
        .collection('songs')
        .doc(songId)
        .onSnapshot({
          next: doc => {
            const data = doc.data();
            const song = {
              ...data,
              id: doc.id,
              isOwner: user.id === data.owner,
            };

            setState({ loading: false, error: null, song });
            setPageData({
              title: song.title,
              back: '/',
              fab: song.isOwner && (
                <ButtonLink variant="fab" color="secondary" to={`/songs/${song.id}/edit`}>
                  <EditIcon />
                </ButtonLink>
              ),
            });
          },
          error: error => {
            setState({ loading: false, error, song: null });
          },
        });
    },
    [user, songId]
  );

  if (loading) return <Loading className={classes.loading} />;
  if (error) return <ErrorSnackbar error={error} />;
  return <Song song={song} />;
}

const styles = ({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
});

export default compose(
  withStyles(styles),
  withAuth,
  withPageData
)(({ match: { params: { songId } }, ...props }) => <SongWrapper songId={songId} {...props} />);
