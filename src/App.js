import React from 'react';
import SessionsPage from './SessionsPage';
import PlayersPage from './PlayersPage';
import Game from './Game';
import {db} from './firestore';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session: null,
      player: null,
      warning: "",
    };
  }

  setValue = (newMap) => {
    this.setState(newMap);
  };

  joinSession = ()=> {
    var session = document.getElementById("session").value;

    db.ref(`BowlGame/${session}`).once("value", snapshot => {

      if (snapshot.val() !== null ) {
        var wordsPerPerson = snapshot.val().wordsPerPerson;
        this.setState(
          {
            session,
            wordsPerPerson
          });
      }else {
        // props.setAppState({warning: "this session doesnt exist"});
      }
    });
  };

  componentDidMount() {  
    var session = window.location.pathname.replace("/bowl-game/", "");
    var player = window.location.search.replace("?player=", "");
    if(session !== "") {
      db.ref(`BowlGame/${session}`).once("value", snapshot => {

        if (snapshot.val() !== null ) {
          var wordsPerPerson = snapshot.val().wordsPerPerson;
          var update = {
            session,
            wordsPerPerson
          };

          if (snapshot.val().players[player] !== undefined) {
            update.player = player;
          }
          this.setState(update);
        }else {
          
        }
      });
    }
  }

  render() {
    var {session, player, warning, wordsPerPerson} = this.state;

    return (
      <div>
        <h1>The Bowl Game</h1>
        {session == null && <SessionsPage setAppState={this.setValue}/>}
        {session != null && player == null && <PlayersPage session={session} setAppState={this.setValue} warning={warning} />}
        {session != null && player != null && <Game session={session} player={player} wordCount={wordsPerPerson}/>}
      </div>
    )
    // if (session == null) {
    //   return <SessionsPage setSession={null}/>
    // }
    // if (player == null) {
    //   return <PlayersPage setSession={null}/>
    // }
    // return <h1>Hello, {session}</h1>;
  }
}
export default App;
