import React from 'react';
import { Button } from 'reactstrap';
import FontAwesome from '../components/FontAwesome';

export default function SaveButton({ saving, saved, valid }) {
  if (saving) {
    return (
      <Button color="primary" disabled={true}>
        <FontAwesome icon="spinner" className="fa-pulse mr-2" />
        Saving…
      </Button>
    );
  }

  if (saved) {
    return (
      <Button color="success">
        <FontAwesome icon="check" className="mr-2" />
        Saved!
      </Button>
    );
  }

  return (
    <Button type="submit" color="primary" disabled={!valid}>
      Save
    </Button>
  );
}
