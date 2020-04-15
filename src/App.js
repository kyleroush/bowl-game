import React from 'react';
import SessionsPage from './SessionsPage';
import PlayersPage from './PlayersPage';
import Game from './Game';

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



  render() {
    var {session, player, warning} = this.state;

    return (
      <div>
        {session == null && <SessionsPage setAppState={this.setValue}/>}
        {session != null && player == null && <PlayersPage session={session} setAppState={this.setValue} warning={warning} />}
        {session != null && player != null && <Game session={session} player={player} wordCount={3}/>}
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
