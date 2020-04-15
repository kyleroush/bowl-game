import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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

    firestore.collection('BowlGame').doc(session).get().then(function(doc) {

      if (doc.exists) {
        props.setAppState({session: session});
      }else {
        props.setAppState({warning: "this session doesnt exist"});
      }
    });

  };

  const createSession = ()=> {

    var session = document.getElementById("session").value;
    var doc;
    if (session === "") {
      doc = firestore.collection('BowlGame').doc();
      session = doc.id;

      doc.set({
        players: {},
        gottenWords: []
      })

      props.setAppState({session: session});
    } else {

      firestore.collection('BowlGame').doc(session).get()
        .then(function(doc) {
          if (!doc.exists) {
            doc = firestore.collection('BowlGame').doc(session);
            props.setAppState({session: session});
            doc.set({
              players: {},
              gottenWords: []
            })
          }
        });
    }
  };
  return (
    <List>
      {props.warning !== "" && 
        <ListItem>
          <Typography color="textSecondary" >
            {props.warning}
          </Typography>
        </ListItem>
      }
      <ListItem>
        <TextField id="session" label="Session" variant="outlined" />
      </ListItem>
      <Divider />
      <ListItem>
        <Fab variant="extended" color="primary" aria-label="create" className={useStyles().margin} onClick={createSession}>
          Create Session
        </Fab>
        <Fab variant="extended" color="primary" aria-label="join" className={useStyles().margin} onClick={setSession}>
          Join Session
        </Fab>
      </ListItem>
    </List>
  );
}

export default SessionsPage;
