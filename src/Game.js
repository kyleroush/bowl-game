import React from 'react';
import {TextField, List, ListItem, ListItemText, Fab, Card, CardContent, Typography, Divider, Collapse} from '@material-ui/core';
import {db} from './firestore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: "addingWords",
      addingWords: true,
      words: null,
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: [],
      snapshot:null
    }


    this.gameStates = {
      addingWords: "addingWords",
      readying: "readying",
      playing: "playing"
    }
  }

  componentDidMount() {  
    var {session} = this.props;
    var that = this;

    db.ref(`BowlGame/${session}`).on("value", snapshot => {
      that.setState({
        snapshot: snapshot.val()
      })
    });
  }

  onAddWords = () => {
    var {wordCount, player, session} = this.props;
    var words = Array(wordCount).fill().map((_, i) => document.getElementById(`word-${i}`).value);
    // filter out bad words

    db.ref(`BowlGame/${session}/players/${player}`).update({
      name: player,
      words
    })
    this.setState({gameState: this.gameStates.playing});
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
        </List>
        <Fab variant="extended" color="primary" aria-label="join" onClick={this.onAddWords}>
          Add Words
        </Fab>: 
        <Fab variant="extended" color="primary" aria-label="join" onClick={() => this.setState({gameState: this.gameStates.playing})}>
          Skip Adding words
        </Fab>
      </div>
      );
  }

  yourTurn= () => {
    var { snapshot } = this.state;
    var that = this;
    var aviableWords  = [];
    var gottenWords  = [];

    gottenWords = gottenWords.concat(snapshot.gottenWords)

    for (const player in snapshot.players) {
      var playerObj = snapshot.players[player];
      aviableWords = aviableWords.concat(playerObj.words)
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

  finalWord = () => {
    var {gottenWords, currentWord} = this.state;
    var {session} = this.props;
    gottenWords.push(currentWord)

    var newGottenWords = gottenWords.concat(this.getSnapshotGottenWords());

    db.ref(`BowlGame/${session}`).update({
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

  getSnapshotGottenWords = () => {
    var {snapshot} = this.state;
    return snapshot.gottenWords===undefined? [] :snapshot.gottenWords;
  }

  finishTurn = () => {
    var {gottenWords} = this.state;
    var {session} = this.props;
    
    var newGottenWords = gottenWords.concat(this.getSnapshotGottenWords());

    db.ref(`BowlGame/${session}`).update({
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

        {
          aviableWords.length !==0? 
            <Fab variant="extended" color="primary" aria-label="join" onClick={this.nextWord}>
              Gotten Word
            </Fab>: 
            <Fab variant="extended" color="primary" aria-label="join" onClick={this.finalWord}>
              Gotten Final Word
            </Fab>
        }
        <Fab variant="extended" color="primary" aria-label="join" onClick={this.finishTurn}>
          End Turn
        </Fab>
      </div>
    )
  }

  resetSession = () => {
    var {session} = this.props;
    var {snapshot} = this.state;
    var update = {};

    for (const player in snapshot.players) {
      update[player] = {
        name: player
      }
    }

    db.ref(`BowlGame/${session}`).update({
      gottenWords: [],
      players: update
    });

    this.setState({
      addingWords: true,
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    });
  }

  reuseWords = () => {
    var {session} = this.props

    // make a request to reset game
    db.ref(`BowlGame/${session}`).update({
      gottenWords: []
    });

    this.setState({
      addingWords: false,
      yourTurn: false,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    });
  }

  markReady = () => {
    var {session, player} = this.props
    var {snapshot} = this.state

    var update = snapshot.players[player];
    update.ready = true; 

    db.ref(`BowlGame/${session}/players/${player}`).update(update)
  }

  renderReady = () => {
    return (
      <Fab variant="extended" color="secondary" aria-label="join" onClick={this.markReady} >
        Ready to start
      </Fab>);
  }

  renderPlayers = () => {
    var {snapshot, open} = this.state

    const toggleOpen = () => {
      this.setState({open: !open});
    };

    if(snapshot === null) {
      return(<List></List>)
    }

    return (
      <List>
        <ListItem button onClick={toggleOpen}>
        
          <ListItemText primary="Players" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List >
            {
              Object.keys(snapshot.players).map((key) => {
                return(<ListItem key={key}>
                  <ListItemText>
                    player: {key} {snapshot.players[key].words !== undefined? "words submitted" : "needs to submit words"}
                  </ListItemText>
                </ListItem>)
              })
            }
          </List>
        </Collapse>
      </List>);
  }

  renderResets = () => {
    return(
      <div>
        <Divider />
        <Fab variant="extended" color="secondary" aria-label="join" onClick={this.reuseWords} >
          Put words back in bowl
        </Fab>
        <Fab variant="extended" color="secondary" aria-label="join" onClick={this.resetSession} >
          End Game and start new?
        </Fab>
      </div>
    )
  }

  render() {
    var {session, player} = this.props;
    var {yourTurn, gameState} = this.state;

    return (
      <div>
        <h1>Hello, {player}! You have joined {session}.</h1>
        {gameState === this.gameStates.addingWords && this.renderAddWords()}
        {gameState === this.gameStates.playing && (yourTurn? this.renderDuringTurn(): this.renderStartTurn())}
        {gameState === this.gameStates.playing && !yourTurn && this.renderResets()}
        {!yourTurn && this.renderPlayers()}
      </div>
    );
  }
}
export default Game;

// teams
// count down
// score
// display words gotten
// list players
// validation/warnings (player name, etc)
