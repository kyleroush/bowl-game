import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

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

function PlayersPage(props) {

  const setPlayer = ()=> {
    // console.log(" ")
    var name = document.getElementById("name").value;


    var update = {};
    update[`players.${name}`] = {}
    firestore.collection('BowlGame').doc(props.session).update(update);
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
