(function(e){function t(t){for(var i,l,s=t[0],u=t[1],g=t[2],c=0,b=[];c<s.length;c++)l=s[c],a[l]&&b.push(a[l][0]),a[l]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(e[i]=u[i]);o&&o(t);while(b.length)b.shift()();return r.push.apply(r,g||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(i=!1)}i&&(r.splice(t--,1),e=l(l.s=n[0]))}return e}var i={},a={app:0},r=[];function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=i,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(n,i,function(t){return e[t]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/ScrabbleApp/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var g=0;g<s.length;g++)t(s[g]);var o=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"1f2c":function(e,t,n){e.exports=n.p+"img/Scrabble.37fe70aa.jpg"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("body",[n("Uebersichts-bereich")],1)])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("header",[i("div",{staticClass:"header-limiter"},[i("h1",[i("img",{attrs:{alt:"Vue logo",src:n("1f2c")}}),e._v("\n\t \t\t  Steph's Scrabble-App mit Vue.js\n        "),i("img",{attrs:{alt:"Vue logo",src:n("1f2c")}})])])])}],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"uebersicht"},[n("form",{on:{submit:function(t){return t.preventDefault(),e.addNewScrabblezug(t)}}},[n("EingabeTitel",{attrs:{spielzug:e.spielzug},on:{changed:e.onBeginnChange}}),n("div",{staticClass:"inputArea"},[n("div",[n("label",[e._v("Wortpunkte für diesen Zug: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zug.punkteZug,expression:"zug.punkteZug"}],domProps:{value:e.zug.punkteZug},on:{input:function(t){t.target.composing||e.$set(e.zug,"punkteZug",t.target.value)}}})]),n("br"),n("label",[e._v("Bingo: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zug.bingo,expression:"zug.bingo"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.zug.bingo)?e._i(e.zug.bingo,null)>-1:e.zug.bingo},on:{change:function(t){var n=e.zug.bingo,i=t.target,a=!!i.checked;if(Array.isArray(n)){var r=null,l=e._i(n,r);i.checked?l<0&&e.$set(e.zug,"bingo",n.concat([r])):l>-1&&e.$set(e.zug,"bingo",n.slice(0,l).concat(n.slice(l+1)))}else e.$set(e.zug,"bingo",a)}}})]),n("label",[e._v("   Gegner hat angezweifelt: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zug.hatAngezweifelt,expression:"zug.hatAngezweifelt"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.zug.hatAngezweifelt)?e._i(e.zug.hatAngezweifelt,null)>-1:e.zug.hatAngezweifelt},on:{change:function(t){var n=e.zug.hatAngezweifelt,i=t.target,a=!!i.checked;if(Array.isArray(n)){var r=null,l=e._i(n,r);i.checked?l<0&&e.$set(e.zug,"hatAngezweifelt",n.concat([r])):l>-1&&e.$set(e.zug,"hatAngezweifelt",n.slice(0,l).concat(n.slice(l+1)))}else e.$set(e.zug,"hatAngezweifelt",a)}}})])]),e.zug.hatAngezweifelt?n("div",[n("label",[e._v("Wort korrekt "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zug.angezweifeltKorrekt,expression:"zug.angezweifeltKorrekt"}],attrs:{type:"radio",id:"Wort korrekt",value:"0"},domProps:{checked:e._q(e.zug.angezweifeltKorrekt,"0")},on:{change:function(t){e.$set(e.zug,"angezweifeltKorrekt","0")}}})]),e._v("\n        \n      "),n("label",[e._v("Wort falsch "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zug.angezweifeltKorrekt,expression:"zug.angezweifeltKorrekt"}],attrs:{type:"radio",id:"Wort falsch",value:"1"},domProps:{checked:e._q(e.zug.angezweifeltKorrekt,"1")},on:{change:function(t){e.$set(e.zug,"angezweifeltKorrekt","1")}}})])]):e._e(),n("br"),e.beginnEins||e.beginnZwei?n("button",{attrs:{type:"submit"}},[e._v("Scrabblezug eingeben")]):e._e(),n("br"),n("br")])],1),n("TableZuege",{attrs:{scrabbleZuege:e.scrabbleZuege}})],1)},s=[],u=n("e814"),g=n.n(u),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"eingabeTitel"},[e.spielzug<=1?n("label",{staticClass:"nameLabel"},[e._v("Beginn Anica")]):e.getIsSpielerAmZug(1)?n("label",{staticClass:"nameLabel"},[e._v("Anica's Zug")]):e._e(),1==e.spielzug?n("input",{directives:[{name:"model",rawName:"v-model",value:e.beginner,expression:"beginner"}],attrs:{type:"radio",id:"Anica",value:"1"},domProps:{checked:e._q(e.beginner,"1")},on:{change:[function(t){e.beginner="1"},e.onBeginnChange]}}):e._e(),e._v("\r\n        \r\n  "),e.spielzug<=1?n("label",{staticClass:"nameLabel"},[e._v("Beginn Steph")]):e.getIsSpielerAmZug(2)?n("label",{staticClass:"nameLabel"},[e._v("Steph's Zug")]):e._e(),1==e.spielzug?n("input",{directives:[{name:"model",rawName:"v-model",value:e.beginner,expression:"beginner"}],attrs:{type:"radio",id:"Steph",value:"2"},domProps:{checked:e._q(e.beginner,"2")},on:{change:[function(t){e.beginner="2"},e.onBeginnChange]}}):e._e(),n("br"),n("br")])},c=[],b=(n("c5f6"),{name:"EingabeTitel",props:{spielzug:Number},data:function(){return{beginner:0}},methods:{onBeginnChange:function(e){this.$emit("changed",this.beginner)},getIsSpielerAmZug:function(e){return 1==this.beginner?1==e?this.spielzug%2!=0:this.spielzug%2==0:2==e?this.spielzug%2!=0:this.spielzug%2==0}}}),f=b,h=(n("e6ac"),n("2877")),p=Object(h["a"])(f,o,c,!1,null,null,null);p.options.__file="EingabeTitel.vue";var v=p.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rTable"},[n("TitelRow"),e.anzInTable>0?n("div",{ref:"tableZuege",staticClass:"rTableRow"},[n("div",{staticClass:"rTableCell"},[e._v("...")]),n("div",{staticClass:"rTableCell"},[e._v("...")]),n("div",{staticClass:"rTableCell"},[e._v("...")])]):e._e(),e._l(e.scrabbleZuege,function(t,i){return n("div",{staticClass:"rTableRow"},[e.anzInTable<=0||i+1+e.anzInTable>e.scrabbleZuege.length?n("div",{staticClass:"rTableCell"},[e._v(e._s(i+1))]):e._e(),e.anzInTable<=0||i+1+e.anzInTable>e.scrabbleZuege.length?n("div",{staticClass:"rTableCell"},[e._v(e._s(e.getPunkteProZugString(t[0],t[1],1)))]):e._e(),e.anzInTable<=0||i+1+e.anzInTable>e.scrabbleZuege.length?n("div",{staticClass:"rTableCell"},[e._v(e._s(e.getPunkteProZugString(t[1],t[0],2)))]):e._e()])}),n("TotalRow",{attrs:{scrabbleZuege:e.scrabbleZuege}})],2)},z=[],_=(n("6b54"),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),m=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rTableHeading"},[n("div",{staticClass:"rTableHead"},[n("strong",[e._v("Zug")])]),n("div",{staticClass:"rTableHead"},[n("strong",[e._v("Anica")])]),n("div",{staticClass:"rTableHead"},[n("strong",[e._v("Steph")])])])}],w={name:"TitelRow"},k=w,A=Object(h["a"])(k,_,m,!1,null,null,null);A.options.__file="TitelRow.vue";var Z=A.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rTableFoot"},[n("div",{staticClass:"rTableCell"},[e._v("Total")]),n("div",{staticClass:"rTableCell"},[n("div",[e._v("Punkte: "+e._s(e.getBetragSpieler(1)[0]))]),e.getBetragSpieler(1)[1]>0?n("div",[e._v("Anzahl Bingos: "+e._s(e.getBetragSpieler(1)[1]))]):e._e(),e.getBetragSpieler(1)[2]>0?n("div",[e._v("Anzahl angezweifelt: "+e._s(e.getBetragSpieler(1)[2]))]):e._e(),e.getBetragSpieler(1)[3]>0?n("div",[e._v("Davon falsch angezweifelt:  "+e._s(e.getBetragSpieler(1)[3]))]):e._e()]),n("div",{staticClass:"rTableCell"},[n("div",[e._v("Punkte: "+e._s(e.getBetragSpieler(2)[0]))]),e.getBetragSpieler(2)[1]>0?n("div",[e._v("Anzahl Bingos: "+e._s(e.getBetragSpieler(2)[1]))]):e._e(),e.getBetragSpieler(2)[2]>0?n("div",[e._v("Anzahl angezweifelt:"+e._s(e.getBetragSpieler(2)[2]))]):e._e(),e.getBetragSpieler(2)[3]>0?n("div",[e._v("Davon falsch angezweifelt: "+e._s(e.getBetragSpieler(2)[3]))]):e._e()])])},C=[],S=n("7618"),y={name:"TotalRow",props:{scrabbleZuege:{type:Array,default:function(){return[]}}},methods:{getBetragSpieler:function(e){var t=[];t[0]=0,t[1]=0,t[2]=0,t[3]=0;for(var n=0;n<this.scrabbleZuege.length;n++){var i=this.scrabbleZuege[n];void 0!==Object(S["a"])(i[e-1])&&(t[0]+=g()(i[e-1].totalPunkteZug),i[e-1].bingo&&t[1]++,i[e-1].hatAngezweifelt&&(t[2]++,0==i[e-1].hatKorrektAngezweifelt&&t[3]++))}return t}}},B=y,P=Object(h["a"])(B,T,C,!1,null,null,null);P.options.__file="TotalRow.vue";var E=P.exports,x={name:"ZugCells",props:{anzInTable:{type:Number,default:0},scrabbleZuege:{type:Array,default:function(){return[]}}},methods:{getPunkteProZugString:function(e,t,n){var i="Punkte:"+e.punkteZug.toString();return e.bingo&&(i+=" + Bingo:50"),e.hatAngezweifelt&&(i="(Z) | "+i,0==e.hatKorrektAngezweifelt&&(i+=" -10")),i}},components:{TitelRow:Z,TotalRow:E}},K=x,$=Object(h["a"])(K,d,z,!1,null,null,null);$.options.__file="TableZuege.vue";var j=$.exports,I={name:"UebersichtsBereich",data:function(){return{spielzug:1,beginnEins:!1,beginnZwei:!1,scrabbleZuege:[],lastZug:[],zug:{totalPunkteZug:0,punktezug:"",bingo:!1,hatAngezweifelt:!1,angezweifeltKorrekt:0},tableBottomWithTitelAndTotal:0,anzInTable:0}},mounted:function(){var e=this;window.addEventListener("resize",function(){return e.handleResize()}),console.log("ADDDED")},destroyed:function(){var e=this;document.removeEventListener("resize",function(){return e.handleResize()}),console.log("REMOVED")},methods:{onBeginnChange:function(e){this.beginnEins=1==e,this.beginnZwei=!this.beginnEins},addNewScrabblezug:function(){var e=this.zug.punkteZug;if(""!=e&&0!=e.length&&null!=e&&!isNaN(e)){var t={punkteZug:e,bingo:this.zug.bingo,hatAngezweifelt:!1,hatKorrektAngezweifelt:0};if(this.spielzug%2==0){var n={punkteZug:this.lastZug.punkteZug,bingo:this.lastZug.bingo,hatAngezweifelt:this.zug.hatAngezweifelt,hatKorrektAngezweifelt:this.zug.angezweifeltKorrekt};t.hatAngezweifelt=this.lastZug.gegnerHatAngezweifelt,t.hatKorrektAngezweifelt=this.lastZug.gegnerHatKorrektAngezweifelt;var i=O(this.beginnEins,n,t);this.scrabbleZuege=this.scrabbleZuege.slice(0,this.scrabbleZuege.length-1),R(i),this.scrabbleZuege.push(i)}else{var a={punkteZug:0,bingo:!1,hatAngezweifelt:this.zug.hatAngezweifelt,hatKorrektAngezweifelt:this.zug.angezweifeltKorrekt},r=O(this.beginnEins,t,a);R(r),this.scrabbleZuege.push(r)}this.lastZug.punkteZug=t.punkteZug,this.lastZug.bingo=t.bingo,this.lastZug.gegnerHatAngezweifelt=this.zug.hatAngezweifelt,this.lastZug.gegnerHatKorrektAngezweifelt=this.zug.angezweifeltKorrekt,this.zug.punkteZug="",this.zug.bingo=!1,this.zug.hatAngezweifelt=!1,this.spielzug++,this.calcAnzInTableSichtbar()}},handleResize:function(){console.log("resize"),this.anzInTable=0,this.calcAnzInTableSichtbar()},calcAnzInTableSichtbar:function(){this.anzInTable=0}},components:{EingabeTitel:v,TableZuege:j}};function O(e,t,n){var i;return i=e?[t,n]:[n,t],i}function R(e){N(e[0]),N(e[1])}function N(e){var t=g()(e.punkteZug);e.bingo&&(t+=50),e.hatAngezweifelt&&0==e.hatKorrektAngezweifelt&&(t-=10),e.totalPunkteZug=t}var D=I,H=(n("bbed"),Object(h["a"])(D,l,s,!1,null,"16320634",null));H.options.__file="UebersichtsBereich.vue";var L=H.exports,W={name:"app",components:{UebersichtsBereich:L}},M=W,U=(n("034f"),Object(h["a"])(M,a,r,!1,null,null,null));U.options.__file="App.vue";var q=U.exports;i["a"].config.productionTip=!1,i["a"].filter("uppercase",function(e){return e.toUpperCase()}),i["a"].filter("truncate",function(e){var t=60;return e.length<=t?e:e.substring(0,t)+"..."}),new i["a"]({render:function(e){return e(q)}}).$mount("#app")},"64a9":function(e,t,n){},bbed:function(e,t,n){"use strict";var i=n("c2de"),a=n.n(i);a.a},c2de:function(e,t,n){},e3bf:function(e,t,n){},e6ac:function(e,t,n){"use strict";var i=n("e3bf"),a=n.n(i);a.a}});
//# sourceMappingURL=app.1eea8422.js.map