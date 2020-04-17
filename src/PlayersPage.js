import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
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

function PlayersPage(props) {

  const setPlayer = ()=> {
    var {session} = props;
    var name = document.getElementById("name").value;

    db.ref(`BowlGame/${session}/players/${name}`).update({
      name,
      words: [],
      ready: false
    })

    props.setAppState({player: name});
  };
  return (
    <List>
      <ListItem>
        <TextField id="name" label="Name" variant="outlined" />
        <Fab variant="extended" color="primary" aria-label="join" className={useStyles().margin} onClick={setPlayer}>
          Create player
        </Fab>
      </ListItem>
    </List>
  );
}

export default PlayersPage;
