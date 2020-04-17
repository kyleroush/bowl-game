(this["webpackJsonpbowl-game"]=this["webpackJsonpbowl-game"]||[]).push([[0],{70:function(e,a,t){e.exports=t(91)},75:function(e,a,t){},91:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),l=t.n(o),s=(t(75),t(29)),i=t(15),c=t(43),d=t(41),u=t(44),m=t(132),p=t(126),g=t(127),y=t(120),v=t(123),f=t(125),E=t(34),h=t.n(E);h.a.initializeApp({apiKey:"AIzaSyDYIdFDQ3ccmgUHsEJC7EQuPGyX3U0BKoM",authDomain:"reactemoji.firebaseapp.com",databaseURL:"https://reactemoji.firebaseio.com",projectId:"reactemoji",storageBucket:"reactemoji.appspot.com",messagingSenderId:"720480809303",appId:"1:720480809303:web:c82a2de9d2d14ab1a9ce12",measurementId:"G-C64FSH40V9"}),h.a.analytics();var w=h.a.database(),W=(h.a.firestore(),Object(y.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}})));var b=function(e){return r.a.createElement(v.a,null,""!==e.warning&&r.a.createElement(f.a,null,r.a.createElement(u.a,{color:"textSecondary"},e.warning)),r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"session",label:"Session",variant:"outlined"})),r.a.createElement(f.a,null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"create",className:W().margin,onClick:function(){var a=document.getElementById("session").value,t=parseInt(document.getElementById("words-per-person").value);""===a&&(a=Math.random().toString(36).substring(2,10)),w.ref("BowlGame/".concat(a)).once("value",(function(n){null===n.val()&&(w.ref("BowlGame/".concat(a)).update({players:{},gottenWords:[],wordsPerPerson:t,globalGameState:"waiting"}),e.setAppState({session:a,wordsPerPerson:t}))}))}},"Create Bowl Game Session"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",className:W().margin,onClick:function(){var a=document.getElementById("session").value;w.ref("BowlGame/".concat(a)).once("value",(function(t){if(null!==t.val()){var n=t.val().wordsPerPerson;e.setAppState({session:a,wordsPerPerson:n})}else e.setAppState({warning:"this session doesnt exist"})}))}},"Join Bowl Game Session")),r.a.createElement(g.a,null),r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"words-per-person",label:"# of words",variant:"outlined",defaultValue:3,helperText:"number of words per person"})))},S=Object(y.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}));var G=function(e){return r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(m.a,{id:"name",label:"Name",variant:"outlined"}),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",className:S().margin,onClick:function(){var a=e.session,t=document.getElementById("name").value;w.ref("BowlGame/".concat(a,"/players/").concat(t)).update({name:t,words:[],ready:!1}),e.setAppState({player:t})}},"Create player")))},k=t(16),j=t(128),x=t(129),B=t(130),C=t(131),T=t(59),P=t.n(T),A=t(60),I=t.n(A),O=function(e){Object(c.a)(t,e);var a=Object(d.a)(t);function t(e){var n;return Object(s.a)(this,t),(n=a.call(this,e)).onAddWords=function(){var e=n.props,a=e.wordCount,t=e.player,r=e.session,o=Array(a).fill().map((function(e,a){return document.getElementById("word-".concat(a)).value})).filter((function(e){return""!==e}));w.ref("BowlGame/".concat(r,"/players/").concat(t)).update({name:t,words:o}),n.setState({gameState:n.gameStates.playing})},n.yourTurn=function(){var e=n.state.snapshot,a=Object(k.a)(n),t=[],r=[];for(var o in r=r.concat(e.gottenWords),e.players){var l=e.players[o];void 0!==l.words&&(t=t.concat(l.words))}t=t.filter((function(e){return!r.includes(e)}));var s=Math.floor(Math.random()*t.length),i=t[s];t.splice(s,1),a.setState({yourTurn:!0,aviableWords:t,currentWord:i,gottenWords:[]})},n.nextWord=function(){var e=n.state,a=e.currentWord,t=e.aviableWords,r=e.gottenWords,o=Math.floor(Math.random()*t.length);r.push(a),a=t[o],t.splice(o,1),n.setState({aviableWords:t,currentWord:a,gottenWords:r})},n.finalWord=function(){var e=n.state,a=e.gottenWords,t=e.currentWord,r=n.props.session;a.push(t);var o=a.concat(n.getSnapshotGottenWords());w.ref("BowlGame/".concat(r)).update({gottenWords:o}),n.setState({postTurn:!0,aviableWords:[],currentWord:null,gottenWords:a})},n.getSnapshotGottenWords=function(){var e=n.state.snapshot;return void 0===e.gottenWords?[]:e.gottenWords},n.finishTurn=function(){var e=n.state.gottenWords,a=n.props.session,t=e.concat(n.getSnapshotGottenWords());w.ref("BowlGame/".concat(a)).update({gottenWords:t}),n.setState({postTurn:!0,aviableWords:[],currentWord:null})},n.renderGottenWords=function(){var e=n.state.gottenWords;return r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(j.a,null,"The words you got are")),e.map((function(e){return r.a.createElement(f.a,{key:e},r.a.createElement(j.a,null,e))})),r.a.createElement(f.a,null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:function(){return n.setState({postTurn:!1,yourTurn:!1,gottenWords:[]})}},"Finished")))},n.renderDuringTurn=function(){var e=n.state,a=e.currentWord,t=e.aviableWords;return e.postTurn?n.renderGottenWords():r.a.createElement("div",null,r.a.createElement(x.a,null,r.a.createElement(B.a,null,r.a.createElement(u.a,{color:"textPrimary"},"your word is"),r.a.createElement(u.a,{color:"textSecondary"},a))),0!==t.length?r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.nextWord},"Gotten Word"):r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finalWord},"Gotten Final Word"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finishTurn},"End Turn"))},n.resetSession=function(){var e=n.props.session,a=n.state.snapshot,t={};for(var r in a.players)t[r]={name:r};w.ref("BowlGame/".concat(e)).update({gottenWords:[],players:t,globalGameState:"waiting"}),n.setState({addingWords:!0,yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[],gameState:n.gameStates.addingWords})},n.reuseWords=function(){var e=n.props.session;w.ref("BowlGame/".concat(e)).update({gottenWords:[]}),n.setState({addingWords:!1,yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[]})},n.toggleReady=function(){var e=n.props,a=e.session,t=e.player,r=n.state.snapshot.players[t];r.ready=!r.ready,w.ref("BowlGame/".concat(a,"/players/").concat(t)).update(r)},n.startGame=function(){var e=n.props.session;w.ref("BowlGame/".concat(e)).update({globalGameState:"playing"})},n.kickPlayer=function(e){var a=n.props.session,t=n.state.snapshot.players;t[e]={},w.ref("BowlGame/".concat(a,"/players/")).update(t)},n.renderReady=function(){var e=n.props.player,a=n.state.snapshot;return r.a.createElement("div",null,r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.toggleReady},a.players[e].ready?"Not Ready":"Ready to start"),a.players[e].ready&&r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.startGame},"Start Game"))},n.renderPlayers=function(){var e=n.state,a=e.snapshot,t=e.open;return null===a?r.a.createElement(v.a,null):r.a.createElement(v.a,null,r.a.createElement(f.a,{button:!0,onClick:function(){n.setState({open:!t})}},r.a.createElement(j.a,{primary:"Players"}),t?r.a.createElement(P.a,null):r.a.createElement(I.a,null)),r.a.createElement(C.a,{in:t,timeout:"auto",unmountOnExit:!0},r.a.createElement(v.a,null,Object.keys(a.players).map((function(e){return r.a.createElement(f.a,{key:e},r.a.createElement(j.a,null,"player: ",e),r.a.createElement(j.a,null,"waiting"===a.globalGameState&&!0===a.players[e].ready&&"is ready"),r.a.createElement(j.a,null,void 0!==a.players[e].team&&"is on team ".concat(a.players[e].team)),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:function(){return n.kickPlayer(e)}},"Kick Player from Game"))})))))},n.renderResets=function(){return r.a.createElement("div",null,r.a.createElement(g.a,null),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.reuseWords},"Put words back in bowl"),r.a.createElement(p.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.resetSession},"End Game and start new?"))},n.state={gameState:"addingWords",addingWords:!0,words:null,yourTurn:!1,postTurn:!1,aviableWords:[],currentWord:null,gottenWords:[],snapshot:null},n.gameStates={addingWords:"addingWords",ready:"ready",playing:"playing"},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.session,a=this;w.ref("BowlGame/".concat(e)).on("value",(function(e){a.setState({snapshot:e.val()})}))}},{key:"renderAddWords",value:function(){var e=this,a=this.props.wordCount;return r.a.createElement("div",null,r.a.createElement(u.a,null,"Add words to the bowl"),r.a.createElement(v.a,{component:"nav","aria-label":"contacts"},Array(a).fill().map((function(e,a){return r.a.createElement(f.a,{key:"word-".concat(a)},r.a.createElement(m.a,{id:"word-".concat(a),label:"".concat(a+1," word"),variant:"outlined"}))}))),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:this.onAddWords},"Add Words"),r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:function(){return e.setState({gameState:e.gameStates.playing})}},"Skip Adding words"))}},{key:"renderStartTurn",value:function(){var e=this,a=this.state.snapshot,t=[];for(var n in a.players){var o=a.players[n];void 0!==o.words&&(t=t.concat(o.words))}if(0!==(t=t.filter((function(a){return!e.getSnapshotGottenWords().includes(a)}))).length)return r.a.createElement("div",null,r.a.createElement(p.a,{variant:"extended",color:"primary","aria-label":"join",onClick:this.yourTurn},"Start Turn"))}},{key:"render",value:function(){var e=this.props,a=e.session,t=e.player,n=this.state,o=n.yourTurn,l=n.gameState,s=n.snapshot;return null===s?r.a.createElement(u.a,null,"... Loading"):r.a.createElement("div",null,r.a.createElement("h1",null,"Hello, ",t,"! You have joined ",a,"."),"waiting"===s.globalGameState&&l===this.gameStates.addingWords&&this.renderAddWords(),"waiting"===s.globalGameState&&l!==this.gameStates.addingWords&&this.renderReady(),"playing"===s.globalGameState&&(o?this.renderDuringTurn():this.renderStartTurn()),"playing"===s.globalGameState&&!o&&this.renderResets(),!o&&this.renderPlayers())}}]),t}(r.a.Component),R=function(e){Object(c.a)(t,e);var a=Object(d.a)(t);function t(e){var n;return Object(s.a)(this,t),(n=a.call(this,e)).setValue=function(e){n.setState(e)},n.state={session:null,player:null,warning:""},n}return Object(i.a)(t,[{key:"render",value:function(){var e=this.state,a=e.session,t=e.player,n=e.warning,o=e.wordsPerPerson;return r.a.createElement("div",null,r.a.createElement("h1",null,"The Bowl Game"),null==a&&r.a.createElement(b,{setAppState:this.setValue}),null!=a&&null==t&&r.a.createElement(G,{session:a,setAppState:this.setValue,warning:n}),null!=a&&null!=t&&r.a.createElement(O,{session:a,player:t,wordCount:o}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.cb447ba7.chunk.js.map