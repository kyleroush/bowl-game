import React from 'react';
import {TextField, List, ListItem, ListItemText, Fab, Card, CardContent, Typography, Divider} from '@material-ui/core';
import firestore from './firestore';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addingWords: true,
      words: null,
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    }
  }

  onAddWords = () => {
    var {wordCount, player, session} = this.props;
    var words =Array(wordCount).fill().map((_, i) => document.getElementById(`word-${i}`).value);
    // filter out bad words

    var update = {};
    update[`players.${player}`] = {
      words
    }
    firestore.collection('BowlGame').doc(session).update(update);
    this.setState(
      {
        words: words, 
        addingWords: false,
      });
  }

  renderAddWords() {
    var {wordCount} = this.props;
    return (
      <div>
        <Typography>
          Add words to the bowl
        </Typography>
        <List component="nav"  aria-label="contacts">

          {Array(wordCount).fill().map((_, i) => <ListItem  key={`word-${i}`}><TextField id={`word-${i}`} label={`${i+1} word`} variant="outlined" /></ListItem>)}

          <ListItem button onClick={this.onAddWords} >
            <ListItemText inset primary="Add Words" />
          </ListItem>
        </List>
      </div>
      );
  }

  yourTurn= () => {
    var { session } = this.props;
    var that = this;
    var aviableWords  = [];
    var gottenWords  = [];

    // getall words aviable
    firestore.collection('BowlGame').doc(session).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().players);

        gottenWords.concat(doc.data().gottenWords)

        for (const player in doc.data().players) {
          var playerObj = doc.data().players[player];
          aviableWords = aviableWords.concat(playerObj.words)
          console.log(`${player}: ${playerObj.words}`);
        }

        aviableWords = aviableWords.filter(n => !gottenWords.includes(n));
    
        var loc = Math.floor(Math.random() * aviableWords.length)
        var currentWord = aviableWords[loc];
        aviableWords.splice(loc, 1);
    
        that.setState({
          yourTurn: true,
          aviableWords: aviableWords,
          currentWord: currentWord,
          gottenWords: [],
          doc: doc.data(),
        })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });  
  }

  nextWord = () => {
    var {currentWord, aviableWords, gottenWords} = this.state;

    var loc = Math.floor(Math.random() * aviableWords.length)
    
    gottenWords.push(currentWord)
    currentWord = aviableWords[loc];
    aviableWords.splice(loc, 1);
    this.setState({
      aviableWords: aviableWords,
      currentWord: currentWord,
      gottenWords: gottenWords
    })
  }

  finishTurn = () => {
    
    var {gottenWords, doc} = this.state;
    var {session} = this.props;

    var newGottenWords = gottenWords.concat(doc.gottenWords);

    firestore.collection('BowlGame').doc(session).update({
      gottenWords: newGottenWords
    });
    // upload gotten words
    this.setState({
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    })
  }

  renderStartTurn() {

    return (
      <div>
        <Fab variant="extended" color="primary" aria-label="join" onClick={this.yourTurn}>
          Start Turn
        </Fab>
      </div>
    )
  }

  renderDuringTurn = () => {
    var {currentWord, aviableWords} = this.state;
    return(
      <div>
        <Card>      
          <CardContent>
            <Typography color="textPrimary" >
              your word is 
            </Typography>
            <Typography color="textSecondary" >
              {currentWord}
            </Typography>
          </CardContent>
        </Card>

        {aviableWords.length !==0 && <Fab variant="extended" color="primary" aria-label="join" onClick={this.nextWord}>
          Gotten Word
        </Fab>}
        <Fab variant="extended" color="primary" aria-label="join" onClick={this.finishTurn}>
          End Turn
        </Fab>
      </div>
    )
  }

  resetSession = () => {

    // make a request to reset game

    this.setState({
      addingWords: true,
      words: null,
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    });
  }

  renderResets = () => {
    return(
      <div>
        <Divider />
        <Fab variant="extended" color="secondary" aria-label="join">
          Put words back in bowl
        </Fab>
        <Fab variant="extended" color="secondary" aria-label="join" onClick={this.resetSession}>
          End Game and start new?
        </Fab>
      </div>
    )
  }

  render() {
    var {session, player} = this.props;
    var {addingWords, yourTurn} = this.state;

    return (
      <div>
        <h1>Hello, {player}! You have joined {session}.</h1>
        {addingWords && this.renderAddWords()}
        {!addingWords && (yourTurn? this.renderDuringTurn(): this.renderStartTurn())}
        {!addingWords && !yourTurn && this.renderResets()}
      </div>
    );
  }
}
export default Game;
