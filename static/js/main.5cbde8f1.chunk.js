(this["webpackJsonpbowl-game"]=this["webpackJsonpbowl-game"]||[]).push([[0],{70:function(e,a,t){e.exports=t(91)},75:function(e,a,t){},91:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),l=t.n(o),s=(t(75),t(29)),i=t(15),c=t(43),u=t(41),d=t(44),m=t(134),p=t(127),g=t(128),y=t(121),v=t(124),f=t(126),w=t(34),h=t.n(w);h.a.initializeApp({apiKey:"AIzaSyDYIdFDQ3ccmgUHsEJC7EQuPGyX3U0BKoM",authDomain:"reactemoji.firebaseapp.com",databaseURL:"https://reactemoji.firebaseio.com",projectId:"reactemoji",storageBucket:"reactemoji.appspot.com",messagingSenderId:"720480809303",appId:"1:720480809303:web:c82a2de9d2d14ab1a9ce12",measurementId:"G-C64FSH40V9"}),h.a.analytics();var E=h.a.database(),S=(h.a.firestore(),Object(y.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}})));var b=function(e){return r.a.createElement(v.a,null,""!==e.warning&&r.a.createElement(f.a,null,r.a.createElement(d.a,{color:"textSecondary"},e.warning)),r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"session",label:"Session",variant:"outlined"})),r.a.createElement(f.a,null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"create",className:S().margin,onClick:function(){var a=document.getElementById("session").value,t=parseInt(document.getElementById("words-per-person").value);""===a&&(a=Math.random().toString(36).substring(2,10)),E.ref("BowlGame/".concat(a)).once("value",(function(n){null===n.val()&&(E.ref("BowlGame/".concat(a)).update({players:{},gottenWords:[],wordsPerPerson:t,globalGameState:"waiting"}),e.setAppState({session:a,wordsPerPerson:t}),window.history.pushState({},a,"/bowl-game/".concat(a)))}))}},"Create Bowl Game Session"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",className:S().margin,onClick:function(){var a=document.getElementById("session").value;E.ref("BowlGame/".concat(a)).once("value",(function(t){if(null!==t.val()){var n=t.val().wordsPerPerson;e.setAppState({session:a,wordsPerPerson:n}),window.history.pushState({},a,"/bowl-game/".concat(a))}else e.setAppState({warning:"this session doesnt exist"})}))}},"Join Bowl Game Session")),r.a.createElement(g.a,null),r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"words-per-person",label:"# of words",variant:"outlined",defaultValue:3,helperText:"number of words per person"})))},W=Object(y.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}));var G=function(e){return r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"name",label:"Name",variant:"outlined"}),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",className:W().margin,onClick:function(){var a=e.session,t=document.getElementById("name").value;E.ref("BowlGame/".concat(a,"/players/").concat(t)).update({name:t,words:[],ready:!1,gameState:"addingWords"}),e.setAppState({player:t}),window.history.pushState({},a,"?player=".concat(t))}},"Create player")))},k=t(16),j=t(129),B=t(130),x=t(131),C=t(132),P=t(133),T=t(47),A=t.n(T),O=t(48),I=t.n(O),M=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(s.a)(this,t),(n=a.call(this,e)).onAddWords=function(){var e=n.props,a=e.wordCount,t=e.player,r=e.session,o=Array(a).fill().map((function(e,a){return document.getElementById("word-".concat(a)).value})).filter((function(e){return""!==e}));E.ref("BowlGame/".concat(r,"/players/").concat(t)).update({name:t,words:o,gameState:n.gameStates.waiting}),n.setState({gameState:n.gameStates.waiting})},n.yourTurn=function(){var e=n.props,a=e.player,t=e.session,r=n.state.snapshot,o=Object(k.a)(n),l=[],s=[];for(var i in s=s.concat(r.gottenWords),r.players){var c=r.players[i];void 0!==c.words&&(l=l.concat(c.words))}l=l.filter((function(e){return!s.includes(e)}));var u=Math.floor(Math.random()*l.length),d=l[u];l.splice(u,1),E.ref("BowlGame/".concat(t,"/players/").concat(a)).update({gameState:n.gameStates.yourTurn}),o.setState({gameState:n.gameStates.yourTurn,aviableWords:l,currentWord:d,gottenWords:[]})},n.nextWord=function(){var e=n.state,a=e.currentWord,t=e.aviableWords,r=e.gottenWords,o=Math.floor(Math.random()*t.length);r.push(a),a=t[o],t.splice(o,1),n.setState({aviableWords:t,currentWord:a,gottenWords:r})},n.finalWord=function(){var e=n.state,a=e.gottenWords,t=e.currentWord,r=n.props.session;a.push(t);var o=a.concat(n.getSnapshotGottenWords());E.ref("BowlGame/".concat(r)).update({gottenWords:o}),n.setState({gameState:n.gameStates.postTurn,aviableWords:[],currentWord:null,gottenWords:a})},n.getSnapshotGottenWords=function(){var e=n.state.snapshot;return void 0===e.gottenWords?[]:e.gottenWords},n.finishTurn=function(){var e=n.state.gottenWords,a=n.props,t=a.session,r=a.player,o=e.concat(n.getSnapshotGottenWords());E.ref("BowlGame/".concat(t)).update({gottenWords:o}),E.ref("BowlGame/".concat(t,"/players/").concat(r)).update({gameState:n.gameStates.postTurn}),n.setState({gameState:n.gameStates.postTurn,aviableWords:[],currentWord:null})},n.renderGottenWords=function(){var e=n.state.gottenWords;return r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(j.a,null,"You got ",e.length," number of words. and the words you got are ...")),e.map((function(e){return r.a.createElement(f.a,{key:e},r.a.createElement(j.a,null,e))})),r.a.createElement(f.a,null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:function(){return n.setState({gameState:n.gameStates.waiting,gottenWords:[]})}},"Finished")))},n.renderDuringTurn=function(){var e=n.state,a=e.currentWord,t=e.aviableWords;return r.a.createElement("div",null,r.a.createElement(B.a,null,r.a.createElement(x.a,null,r.a.createElement(d.a,{color:"textPrimary"},"your word is"),r.a.createElement(d.a,{color:"textSecondary"},a))),0!==t.length?r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.nextWord},"Gotten Word"):r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finalWord},"Gotten Final Word"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finishTurn},"End Turn"))},n.resetSession=function(){var e=n.props,a=e.session,t=e.player,r=n.state.snapshot,o={};for(var l in r.players)o[l]={name:l,ready:!1};E.ref("BowlGame/".concat(a)).update({gottenWords:[],players:o,globalGameState:"waiting"}),E.ref("BowlGame/".concat(a,"/players/").concat(t)).update({gameState:n.gameStates.addingWords}),n.setState({gameState:n.gameStates.addingWords,aviableWords:[],currentWord:null,gottenWords:[]})},n.reuseWords=function(){var e=n.props,a=e.session,t=e.player;E.ref("BowlGame/".concat(a)).update({gottenWords:[]}),E.ref("BowlGame/".concat(a,"/players/").concat(t)).update({gameState:n.gameStates.waiting}),n.setState({gameState:n.gameStates.waiting,aviableWords:[],currentWord:null,gottenWords:[]})},n.toggleReady=function(){var e=n.props,a=e.session,t=e.player,r=n.state.snapshot.players[t];r.ready=!r.ready,E.ref("BowlGame/".concat(a,"/players/").concat(t)).update(r)},n.startGame=function(){var e=n.props,a=e.session,t=(e.teamCount,n.state.snapshot);for(var r=Array(2).fill([]).map((function(e){return{players:[],score:0}})),o=Object.keys(t.players);0<o.length;){var l=Math.floor(Math.random()*Object.keys(t.players).length);r[0].players.push(o[l]),o.splice(l,1)}E.ref("BowlGame/".concat(a)).update({globalGameState:"playing",teams:r})},n.kickPlayer=function(e){var a=n.props.session,t=n.state.snapshot.players;t[e]={},E.ref("BowlGame/".concat(a,"/players/")).update(t)},n.renderReady=function(){var e=n.props.player,a=n.state.snapshot;return r.a.createElement("div",null,r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.toggleReady},a.players[e].ready?"Not Ready":"Ready to start"),a.players[e].ready&&r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.startGame},"Start Game"))},n.renderPlayers=function(){var e=n.state,a=e.snapshot,t=e.open;return null===a?r.a.createElement(v.a,null):r.a.createElement(v.a,null,r.a.createElement(f.a,{button:!0,onClick:function(){n.setState({open:!t})}},r.a.createElement(j.a,{primary:"Players"}),t?r.a.createElement(A.a,null):r.a.createElement(I.a,null)),r.a.createElement(C.a,{in:t,timeout:"auto",unmountOnExit:!0},r.a.createElement(v.a,null,Object.keys(a.players).map((function(e){return r.a.createElement(f.a,{key:e},r.a.createElement(j.a,null,"player: ",e),r.a.createElement(j.a,null,"waiting"===a.globalGameState&&!0===a.players[e].ready&&"is ready"),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:function(){return n.kickPlayer(e)}},"Kick Player from Game"))})))))},n.renderTeams=function(){var e=n.state,a=e.snapshot,t=e.open;return null===a?r.a.createElement(v.a,null):r.a.createElement(v.a,null,r.a.createElement(f.a,{button:!0,onClick:function(){n.setState({open:!t})}},r.a.createElement(j.a,{primary:"Teams"}),t?r.a.createElement(A.a,null):r.a.createElement(I.a,null)),r.a.createElement(C.a,{in:t,timeout:"auto",unmountOnExit:!0},r.a.createElement(P.a,null,Object.keys(a.teams).map((function(e){return r.a.createElement(P.a,{item:!0,key:e,xs:12},r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(j.a,{primary:"Team ".concat(e)})),(a.teams[e].players||[]).map((function(e){return r.a.createElement(f.a,null,r.a.createElement(j.a,{primary:"player: ".concat(e)}))}))))})))))},n.renderResets=function(){return r.a.createElement("div",null,r.a.createElement(g.a,null),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.reuseWords},"Put words back in bowl"),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.resetSession},"End Game and start new?"))},n.state={gameState:"addingWords",words:null,aviableWords:[],currentWord:null,gottenWords:[],snapshot:null},n.gameStates={addingWords:"addingWords",yourTurn:"yourTurn",postTurn:"postTurn",waiting:"waiting"},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,a=e.session,t=e.player,n=this;E.ref("BowlGame/".concat(a)).on("value",(function(e){n.setState({snapshot:e.val(),gameState:e.val().players[t].gameState})}))}},{key:"renderAddWords",value:function(){var e=this,a=this.props,t=a.wordCount,n=a.player,o=a.session;return r.a.createElement("div",null,r.a.createElement(d.a,null,"Add words to the bowl"),r.a.createElement(v.a,{component:"nav","aria-label":"contacts"},Array(t).fill().map((function(e,a){return r.a.createElement(f.a,{key:"word-".concat(a)},r.a.createElement(m.a,{id:"word-".concat(a),label:"".concat(a+1," word"),variant:"outlined"}))}))),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:this.onAddWords},"Add Words"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:function(){E.ref("BowlGame/".concat(o,"/players/").concat(n)).update({gameState:e.gameStates.waiting}),e.setState({gameState:e.gameStates.waiting})}},"Skip Adding words"))}},{key:"renderStartTurn",value:function(){var e=this,a=this.state.snapshot,t=[];for(var n in a.players){var o=a.players[n];void 0!==o.words&&(t=t.concat(o.words))}if(0!==(t=t.filter((function(a){return!e.getSnapshotGottenWords().includes(a)}))).length)return r.a.createElement("div",null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:this.yourTurn},"Start Turn"))}},{key:"render",value:function(){var e=this.props,a=e.session,t=e.player,n=this.state,o=n.gameState,l=n.snapshot;return null===l?r.a.createElement(d.a,null,"... Loading"):r.a.createElement("div",null,r.a.createElement("h1",null,"Hello, ",t,"! You have joined ",a,"."),"waiting"===l.globalGameState&&o===this.gameStates.addingWords&&this.renderAddWords(),"waiting"===l.globalGameState&&o===this.gameStates.waiting&&this.renderReady(),"playing"===l.globalGameState&&(o===this.gameStates.yourTurn?this.renderDuringTurn():this.renderStartTurn()),"playing"===l.globalGameState&&o===this.gameStates.waiting&&this.renderResets(),"playing"===l.globalGameState&&o===this.gameStates.postTurn&&this.renderGottenWords(),o===this.gameStates.waiting&&l.teams?this.renderTeams():this.renderPlayers())}}]),t}(r.a.Component),R=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(s.a)(this,t),(n=a.call(this,e)).setValue=function(e){n.setState(e)},n.joinSession=function(){var e=document.getElementById("session").value;E.ref("BowlGame/".concat(e)).once("value",(function(a){if(null!==a.val()){var t=a.val().wordsPerPerson;n.setState({session:e,wordsPerPerson:t})}}))},n.state={session:null,player:null,warning:""},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,a=window.location.pathname.replace("/bowl-game/",""),t=window.location.search.replace("?player=","");""!==a&&E.ref("BowlGame/".concat(a)).once("value",(function(n){if(null!==n.val()){var r=n.val().wordsPerPerson,o={session:a,wordsPerPerson:r};void 0!==n.val().players[t]&&(o.player=t),e.setState(o)}}))}},{key:"render",value:function(){var e=this.state,a=e.session,t=e.player,n=e.warning,o=e.wordsPerPerson;return r.a.createElement("div",null,r.a.createElement("h1",null,"The Bowl Game"),null==a&&r.a.createElement(b,{setAppState:this.setValue}),null!=a&&null==t&&r.a.createElement(G,{session:a,setAppState:this.setValue,warning:n}),null!=a&&null!=t&&r.a.createElement(M,{session:a,player:t,wordCount:o}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.5cbde8f1.chunk.js.map