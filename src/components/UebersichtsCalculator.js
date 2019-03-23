export function getDoppelzugZuBeginner(beginnEins,scrabbleZugEins,scrabbleZugZwei) {
  let dpZugEins;
  if(beginnEins) {
    dpZugEins = [scrabbleZugEins, scrabbleZugZwei];
  } else {
    dpZugEins = [scrabbleZugZwei, scrabbleZugEins];
  }
  return dpZugEins;
}

export function calcDoppelzugTotal(doppelzug) {
  calcEinzelzugTotal(doppelzug[0]);
  calcEinzelzugTotal(doppelzug[1]);  
}

function calcEinzelzugTotal(einzelzug) {
  let zugTotal=parseInt(einzelzug.punkteZug);
  if(einzelzug.bingo){
    zugTotal+=50;
  }
  if(einzelzug.hatAngezweifelt&&einzelzug.hatKorrektAngezweifelt==0){
    zugTotal-=10;
  }
  let rest=parseInt(einzelzug.restpunkte);
  if(rest<0){
    zugTotal+=rest;
  }
  let bonus=parseInt(einzelzug.bonusPunkte);
  if(bonus>0){
    zugTotal+=bonus;
  }
  einzelzug.totalPunkteZug=zugTotal;
}
