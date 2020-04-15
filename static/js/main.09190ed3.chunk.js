(this["webpackJsonpbowl-game"]=this["webpackJsonpbowl-game"]||[]).push([[0],{62:function(e,a,t){e.exports=t(82)},67:function(e,a,t){},82:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),l=t.n(o),c=(t(67),t(27)),i=t(15),s=t(38),d=t(37),u=t(121),m=t(116),p=t(110),v=t(117),g=t(113),y=t(115),W=t(40),E=t.n(W);E.a.initializeApp({apiKey:"AIzaSyDYIdFDQ3ccmgUHsEJC7EQuPGyX3U0BKoM",authDomain:"reactemoji.firebaseapp.com",databaseURL:"https://reactemoji.firebaseio.com",projectId:"reactemoji",storageBucket:"reactemoji.appspot.com",messagingSenderId:"720480809303",appId:"1:720480809303:web:c82a2de9d2d14ab1a9ce12",measurementId:"G-C64FSH40V9"}),E.a.analytics();var f=E.a.firestore(),h=Object(p.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}));var b=function(e){return r.a.createElement(g.a,null,r.a.createElement(y.a,null,r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"create",className:h().margin,onClick:function(){var a=f.collection("BowlGame").doc(),t=a.id;a.set({players:{},gottenWords:[]}),e.setAppState({session:t})}},"Create Session")),r.a.createElement(v.a,null),r.a.createElement(y.a,null,r.a.createElement(u.a,{id:"session",label:"Session",variant:"outlined"}),r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",className:h().margin,onClick:function(){var a=document.getElementById("session").value;e.setAppState({session:a})}},"Join Session")))},w=Object(p.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}));var j=function(e){return r.a.createElement(g.a,null,r.a.createElement(y.a,null,r.a.createElement(u.a,{id:"name",label:"Name",variant:"outlined"}),r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",className:w().margin,onClick:function(){var a=document.getElementById("name").value,t={};t["players.".concat(a)]={},f.collection("BowlGame").doc(e.session).update(t),e.setAppState({player:a})}},"Create player")))},S=t(16),k=t(118),C=t(119),x=t(41),T=t(120),A=function(e){Object(s.a)(t,e);var a=Object(d.a)(t);function t(e){var n;return Object(c.a)(this,t),(n=a.call(this,e)).onAddWords=function(){var e=n.props,a=e.wordCount,t=e.player,r=e.session,o=Array(a).fill().map((function(e,a){return document.getElementById("word-".concat(a)).value})),l={};l["players.".concat(t)]={words:o},f.collection("BowlGame").doc(r).update(l),n.setState({words:o,addingWords:!1})},n.yourTurn=function(){var e=n.props.session,a=Object(S.a)(n),t=[],r=[];f.collection("BowlGame").doc(e).get().then((function(e){if(e.exists){for(var n in console.log("Document data:",e.data().players),r=r.concat(e.data().gottenWords),e.data().players){var o=e.data().players[n];t=t.concat(o.words),console.log("".concat(n,": ").concat(o.words))}t=t.filter((function(e){return!r.includes(e)}));var l=Math.floor(Math.random()*t.length),c=t[l];t.splice(l,1),a.setState({yourTurn:!0,aviableWords:t,currentWord:c,gottenWords:[],doc:e.data()})}else console.log("No such document!")}))},n.nextWord=function(){var e=n.state,a=e.currentWord,t=e.aviableWords,r=e.gottenWords,o=Math.floor(Math.random()*t.length);r.push(a),a=t[o],t.splice(o,1),n.setState({aviableWords:t,currentWord:a,gottenWords:r})},n.finalWord=function(){var e=n.state,a=e.gottenWords,t=e.doc,r=e.currentWord,o=n.props.session;a.push(r);var l=a.concat(t.gottenWords);f.collection("BowlGame").doc(o).update({gottenWords:l}),n.setState({yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[]})},n.finishTurn=function(){var e=n.state,a=e.gottenWords,t=e.doc,r=n.props.session,o=a.concat(t.gottenWords);f.collection("BowlGame").doc(r).update({gottenWords:o}),n.setState({yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[]})},n.renderDuringTurn=function(){var e=n.state,a=e.currentWord,t=e.aviableWords;return r.a.createElement("div",null,r.a.createElement(k.a,null,r.a.createElement(C.a,null,r.a.createElement(x.a,{color:"textPrimary"},"your word is"),r.a.createElement(x.a,{color:"textSecondary"},a))),0!==t.length?r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.nextWord},"Gotten Word"):r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finalWord},"Gotten Final Word"),r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",onClick:n.finishTurn},"End Turn"))},n.resetSession=function(){n.setState({addingWords:!0,words:null,yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[]})},n.renderResets=function(){return r.a.createElement("div",null,r.a.createElement(v.a,null),r.a.createElement(m.a,{variant:"extended",color:"secondary","aria-label":"join"},"Put words back in bowl"),r.a.createElement(m.a,{variant:"extended",color:"secondary","aria-label":"join",onClick:n.resetSession},"End Game and start new?"))},n.state={addingWords:!0,words:null,yourTurn:!1,aviableWords:[],currentWord:null,gottenWords:[]},n}return Object(i.a)(t,[{key:"renderAddWords",value:function(){var e=this.props.wordCount;return r.a.createElement("div",null,r.a.createElement(x.a,null,"Add words to the bowl"),r.a.createElement(g.a,{component:"nav","aria-label":"contacts"},Array(e).fill().map((function(e,a){return r.a.createElement(y.a,{key:"word-".concat(a)},r.a.createElement(u.a,{id:"word-".concat(a),label:"".concat(a+1," word"),variant:"outlined"}))})),r.a.createElement(y.a,{button:!0,onClick:this.onAddWords},r.a.createElement(T.a,{inset:!0,primary:"Add Words"}))))}},{key:"renderStartTurn",value:function(){return r.a.createElement("div",null,r.a.createElement(m.a,{variant:"extended",color:"primary","aria-label":"join",onClick:this.yourTurn},"Start Turn"))}},{key:"render",value:function(){var e=this.props,a=e.session,t=e.player,n=this.state,o=n.addingWords,l=n.yourTurn;return r.a.createElement("div",null,r.a.createElement("h1",null,"Hello, ",t,"! You have joined ",a,"."),o&&this.renderAddWords(),!o&&(l?this.renderDuringTurn():this.renderStartTurn()),!o&&!l&&this.renderResets())}}]),t}(r.a.Component),B=function(e){Object(s.a)(t,e);var a=Object(d.a)(t);function t(e){var n;return Object(c.a)(this,t),(n=a.call(this,e)).setValue=function(e){n.setState(e)},n.state={session:null,player:null},n}return Object(i.a)(t,[{key:"render",value:function(){var e=this.state,a=e.session,t=e.player;return r.a.createElement("div",null,null==a&&r.a.createElement(b,{setAppState:this.setValue}),null!=a&&null==t&&r.a.createElement(j,{session:a,setAppState:this.setValue}),null!=a&&null!=t&&r.a.createElement(A,{session:a,player:t,wordCount:3}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[62,1,2]]]);
//# sourceMappingURL=main.09190ed3.chunk.js.map