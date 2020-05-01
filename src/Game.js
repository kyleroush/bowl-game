import React from 'react';
import {TextField, List, ListItem, ListItemText, Fab, Card, CardContent, Typography, Divider, Collapse, Grid, Paper} from '@material-ui/core';
import {db} from './firestore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: "addingWords",
      words: null,
      aviableWords: [],
      currentWord: null,
      gottenWords: [],
      snapshot:null
    }

    this.gameStates = {
      addingWords: "addingWords",
      yourTurn: "yourTurn",
      postTurn: "postTurn",
      waiting: "waiting",
    }
  }

  componentDidMount() {  
    var {session, player} = this.props;
    var that = this;

    db.ref(`BowlGame/${session}`).on("value", snapshot => {
      that.setState({
        snapshot: snapshot.val(),
        gameState: snapshot.val().players[player].gameState
      })
    });
  }

  onAddWords = () => {
    var {wordCount, player, session} = this.props;

    var words = Array(wordCount)
        .fill().map((_, i) => document.getElementById(`word-${i}`).value)
        .filter(word => word !== "");
    // filter out bad words

    db.ref(`BowlGame/${session}/players/${player}`).update({
      name: player,
      words,
      gameState: this.gameStates.waiting
    })
    this.setState({gameState: this.gameStates.waiting});
  }

  renderAddWords() {
    var {wordCount, player, session} = this.props;
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
        </Fab>
        <Fab variant="extended" color="primary" aria-label="join" onClick={() => {

          db.ref(`BowlGame/${session}/players/${player}`).update({
            gameState: this.gameStates.waiting
          })
          this.setState({gameState: this.gameStates.waiting})}
          
        }>
          Skip Adding words
        </Fab>
      </div>
      );
  }

  yourTurn= () => {
    var {player, session} = this.props;

    var { snapshot } = this.state;
    var that = this;
    var aviableWords  = [];
    var gottenWords  = [];

    gottenWords = gottenWords.concat(snapshot.gottenWords)

    for (const player in snapshot.players) {
      var playerObj = snapshot.players[player];
      if(playerObj.words !== undefined)
        aviableWords = aviableWords.concat(playerObj.words)
    }

    aviableWords = aviableWords.filter(n => !gottenWords.includes(n));
    
    var loc = Math.floor(Math.random() * aviableWords.length)
    var currentWord = aviableWords[loc];
    aviableWords.splice(loc, 1);
    db.ref(`BowlGame/${session}/players/${player}`).update({
      gameState: this.gameStates.yourTurn
    })
    that.setState({
      gameState: this.gameStates.yourTurn,
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
      gameState: this.gameStates.postTurn,
      aviableWords: [],
      currentWord: null,
      gottenWords: gottenWords
    })
  }

  getSnapshotGottenWords = () => {
    var {snapshot} = this.state;
    return snapshot.gottenWords===undefined? [] :snapshot.gottenWords;
  }

  finishTurn = () => {
    var {gottenWords} = this.state;
    var {session, player} = this.props;
    
    var newGottenWords = gottenWords.concat(this.getSnapshotGottenWords());

    db.ref(`BowlGame/${session}`).update({
      gottenWords: newGottenWords
    });
    // upload gotten words

    db.ref(`BowlGame/${session}/players/${player}`).update({
      gameState: this.gameStates.postTurn
    })
    this.setState({
      gameState: this.gameStates.postTurn,
      aviableWords: [],
      currentWord: null
    })
  }

  renderGottenWords = () => {
    var {gottenWords} = this.state;
    return (
      <List>
        <ListItem >
              <ListItemText>
                You got {gottenWords.length} number of words. and the words you got are ...
              </ListItemText>
            </ListItem>
       {
        gottenWords.map(word => {
          return (
            <ListItem key={word}>
              <ListItemText>
                {word}
              </ListItemText>
            </ListItem>)
          })
        }
        <ListItem>
          <Fab variant="extended" color="primary" aria-label="join" onClick={() => this.setState({gameState: this.gameStates.waiting, gottenWords:[]})}>
            Finished
          </Fab>
        </ListItem>
      </List>
    )
  }

  renderStartTurn() {
    var {snapshot} = this.state
    var aviableWords =[];

    for (const player in snapshot.players) {
      var playerObj = snapshot.players[player];
      if(playerObj.words !== undefined)
        aviableWords = aviableWords.concat(playerObj.words)
    }

    aviableWords = aviableWords.filter(n => !this.getSnapshotGottenWords().includes(n));
    if (aviableWords.length ===0) {
      return;
    }

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
    var {session, player} = this.props;
    var {snapshot} = this.state;
    var update = {};

    for (const player in snapshot.players) {
      update[player] = {
        name: player,
        ready: false
      }
    }

    db.ref(`BowlGame/${session}`).update({
      gottenWords: [],
      players: update,
      globalGameState: "waiting",
    });


    db.ref(`BowlGame/${session}/players/${player}`).update({
      gameState: this.gameStates.addingWords
    })

    this.setState({
      gameState: this.gameStates.addingWords,
      aviableWords: [],
      currentWord: null,
      gottenWords: [],
    });
  }

  reuseWords = () => {
    var {session, player} = this.props

    // make a request to reset game
    db.ref(`BowlGame/${session}`).update({
      gottenWords: []
    });

    db.ref(`BowlGame/${session}/players/${player}`).update({
      gameState: this.gameStates.waiting
    })
    this.setState({
      gameState: this.gameStates.waiting,
      aviableWords: [],
      currentWord: null,
      gottenWords: []
    });
  }

  toggleReady = () => {
    var {session, player} = this.props
    var {snapshot} = this.state

    var update = snapshot.players[player];
    update.ready = !update.ready; 

    db.ref(`BowlGame/${session}/players/${player}`).update(update)
  }

  startGame = () => {
    var {session, teamCount} = this.props;
    var {snapshot} = this.state;

    teamCount = 2;
    
    var teams = Array(teamCount).fill([]).map(_ => { return { players: [], score: 0 } });
    var players = Object.keys(snapshot.players);
    var count = 0;
    while(0 < players.length) {
      var loc = Math.floor(Math.random() * Object.keys(snapshot.players).length);
      teams[count % teamCount].players.push(players[loc]);
      players.splice(loc, 1);
    }

    db.ref(`BowlGame/${session}`).update({
      globalGameState: "playing",
      // teams
    });
  }

  kickPlayer = (player) => {
    var {session} = this.props
    var {players} = this.state.snapshot

    players[player] = {}


    db.ref(`BowlGame/${session}/players/`).update(players)
  }

  renderReady = () => {
    var {player} = this.props
    var {snapshot} = this.state
    return (
      <div>
        <Fab variant="extended" color="secondary" aria-label="join" onClick={this.toggleReady} >
          {!snapshot.players[player].ready? "Ready to start": "Not Ready"}
        </Fab>
        {snapshot.players[player].ready && <Fab variant="extended" color="secondary" aria-label="join" onClick={this.startGame} >
          Start Game 
        </Fab>}
      </div>
      );
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
                    player: {key}
                  </ListItemText>
                  <ListItemText>
                    {snapshot.globalGameState === "waiting" && snapshot.players[key].ready === true && `is ready`}
                  </ListItemText>

                  <Fab variant="extended" color="secondary" aria-label="join" onClick={() => this.kickPlayer(key)} >
                    Kick Player from Game
                  </Fab>
                </ListItem>);
              })
            }
          </List>
        </Collapse>
      </List>);
  }

  renderTeams = () => {
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
        
          <ListItemText primary="Teams" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid>
            { 
              Object.keys(snapshot.teams).map((key) => {
                return(
                  <Grid item key={key} xs={12}>
                    <List>
                      <ListItem >
                        <ListItemText primary={`Team ${key}`} />
                        {/* <ListItemText primary={`score ${snapshot.teams[key].score}`} /> */}
                      </ListItem>
                      {(snapshot.teams[key].players || []).map((player => {
                        return (
                          <ListItem >
                            <ListItemText primary={`player: ${player}`} />
                          </ListItem>);
                        }))}
                    </List>
                  </Grid>
                  );
              })
            }
          </Grid>
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
    var {gameState, snapshot} = this.state;

    if(snapshot === null) {
      return (
        <Typography>
          ... Loading
        </Typography>
      )
    }

    return (
      <div>
        <h1>Hello, {player}! You have joined {session}.</h1>
        {snapshot.globalGameState === "waiting" 
            && gameState === this.gameStates.addingWords 
            && this.renderAddWords()}
        {snapshot.globalGameState === "waiting" 
            && gameState === this.gameStates.waiting 
            && this.renderReady()}
        {snapshot.globalGameState === "playing" 
            && (gameState === this.gameStates.yourTurn 
                  ? this.renderDuringTurn() 
                  : this.renderStartTurn())}
        {snapshot.globalGameState === "playing" 
            && gameState === this.gameStates.waiting  
            && this.renderResets()}
        {snapshot.globalGameState === "playing" 
            && gameState === this.gameStates.postTurn  
            && this.renderGottenWords()}
        {gameState === this.gameStates.waiting 
            && snapshot.teams ? this.renderTeams() : this.renderPlayers()}
      </div>
    );
  }
}

export default Game;

// teams
//   score
// count down
// list players
// validation/warnings (player name, etc)
//  refresh page/url
