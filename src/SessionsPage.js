import React from 'react';
import {TextField, Fab, Divider, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {db} from './firestore';

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

    db.ref(`BowlGame/${session}`).once("value", snapshot => {

      if (snapshot.val() !== null ) {
        var wordsPerPerson = snapshot.val().wordsPerPerson;
        props.setAppState(
          {
            session,
            wordsPerPerson
          });
      }else {
        props.setAppState({warning: "this session doesnt exist"});
      }
    });

  };

  const createSession = ()=> {

    var session = document.getElementById("session").value;
    var wordsPerPerson = parseInt(document.getElementById("words-per-person").value);
    if (session === "") {
      session = Math.random().toString(36).substring(2, 10);
    }
    db.ref(`BowlGame/${session}`).once("value", snapshot => {

      if (snapshot.val()===null) {
        db.ref(`BowlGame/${session}`).update({
          players: {},
          gottenWords: [],
          wordsPerPerson
        });

        props.setAppState(
          {
            session: session,
            wordsPerPerson
          });
        }
    });
    
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
      <ListItem>
        <Fab variant="extended" color="primary" aria-label="create" className={useStyles().margin} onClick={createSession}>
          Create Bowl Game Session
        </Fab>
        <Fab variant="extended" color="primary" aria-label="join" className={useStyles().margin} onClick={setSession}>
          Join Bowl Game Session
        </Fab>
      </ListItem>
      <Divider />
      <ListItem>
        <TextField id="words-per-person" label="# of words" variant="outlined" defaultValue={3} helperText="number of words per person"/>
      </ListItem>
    </List>
  );
}

export default SessionsPage;
