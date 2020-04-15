import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firestore from './firestore';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function SessionsPage(props) {

  const setSession = ()=> {
    var session = document.getElementById("session").value;
    // check session?
    props.setAppState({session: session});
  };

  const createSession = ()=> {
    // more details like number of words?

    var doc = firestore.collection('BowlGame').doc();
    var session = doc.id;

    doc.set({
      players: {},
      gottenWords: []
    })

    props.setAppState({session: session});
  };
  return (
    <List>
      <ListItem>
        <Fab variant="extended" color="primary" aria-label="create" className={useStyles().margin} onClick={createSession}>
          Create Session
        </Fab>
      </ListItem>
      <Divider />
      <ListItem>
        <TextField id="session" label="Session" variant="outlined" />
        <Fab variant="extended" color="primary" aria-label="join" className={useStyles().margin} onClick={setSession}>
          Join Session
        </Fab>
      </ListItem>
    </List>
  );
}

export default SessionsPage;
