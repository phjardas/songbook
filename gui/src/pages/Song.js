import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, withStyles } from '@material-ui/core';
import { Edit as EditIcon, MoreVert as MoreVertIcon, Share as ShareIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import ButtonLink from '../components/ButtonLink';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import PageQR from '../components/PageQR';
import ShareSong from '../components/ShareSong';
import SongLyrics from '../components/SongLyrics';
import UserChip from '../components/UserChip';
import { firestore } from '../firebase';
import { parseLyrics } from '../opensong';
import { WithAuth } from '../providers/Auth';

function SongMenu({ song, className }) {
  const [anchor, setAnchor] = useState();

  const toggle = e => setAnchor(anchor ? null : e.currentTarget);

  return (
    <div className={className}>
      <IconButton onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={toggle}>
        <ShareSong song={song}>
          {props => (
            <MenuItem {...props}>
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </MenuItem>
          )}
        </ShareSong>
      </Menu>
    </div>
  );
}

function Song({ song, classes }) {
  return (
    <Layout
      title={song.title}
      back="/"
      fab={
        song.isOwner && (
          <ButtonLink variant="fab" color="secondary" to={`/songs/${song.id}/edit`}>
            <EditIcon />
          </ButtonLink>
        )
      }
    >
      <div className={classes.main}>
        <PageQR />

        {song.isOwner && <SongMenu song={song} className={classes.menu} />}

        <Typography variant="h3" component="h1">
          {song.title}
        </Typography>
        <Typography variant="subtitle1">by {song.author}</Typography>

        {!song.isOwner && (
          <Typography variant="body2" component="div" className={classes.screenOnly}>
            Shared by <UserChip id={song.owner} />
          </Typography>
        )}

        <SongLyrics lyrics={parseLyrics(song.lyrics)} originalKey={song.key} />
      </div>
    </Layout>
  );
}

const styles = ({ spacing }) => ({
  main: {
    padding: spacing.unit * 3,
  },
  menu: {
    float: 'right',
    '@media print': {
      display: 'none',
    },
  },
  screenOnly: {
    '@media print': {
      display: 'none',
    },
  },
});

const StyledSong = withStyles(styles)(Song);

function SongWrapper({ user, songId, classes }) {
  const [{ loading, error, song }, setState] = useState({ loading: true });

  useEffect(
    () =>
      firestore
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
          },
          error: error => setState({ loading: false, error, song: null }),
        }),
    [user, songId]
  );

  if (loading) {
    return (
      <Layout back="/">
        <Loading className={classes.loading} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout back="/">
        <ErrorSnackbar error={error} />
      </Layout>
    );
  }

  return <StyledSong song={song} />;
}

const StyledSongWrapper = withStyles(({ spacing }) => ({
  loading: {
    padding: `${spacing.unit * 4}px 0`,
  },
}))(SongWrapper);

export default ({
  match: {
    params: { songId },
  },
}) => <WithAuth>{({ user }) => <StyledSongWrapper songId={songId} user={user} />}</WithAuth>;
