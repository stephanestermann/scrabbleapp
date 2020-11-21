export function getBetragProSpieler(num_spieler, scrabbleZuege) {
  let total=[];
  // 0: Total Punkte
  // 1: Anzahl Bingos
  // 2: Anzahl Anzweiflungen
  // 3: Anzahl falsche Anzweiflungen
  // 4: Spiel beendet
  // 5: Restpunkte
  // 6: Bonuspunkte  
  total[0]=0;
  total[1]=0;
  total[2]=0;      
  total[3]=0;            
  total[4]=0;
  total[5]=0;
  total[6]=0;
  for (let index = 0; index < scrabbleZuege.length; index++) {
    const doppelzug = scrabbleZuege[index];
    if (typeof doppelzug[num_spieler-1] !== undefined) {
      total[0] += parseInt(doppelzug[num_spieler-1].totalPunkteZug);
      if(doppelzug[num_spieler-1].bingo){
        total[1]++;
      }
      if(doppelzug[num_spieler-1].hatAngezweifelt){
        total[2]++;
        if(doppelzug[num_spieler-1].hatKorrektAngezweifelt==0){
          total[3]++;
        }
      }
      total[4]=doppelzug[num_spieler-1].hatSpielBeendet;
      total[5]=doppelzug[num_spieler-1].restpunkte;
      total[6]=doppelzug[num_spieler-1].bonusPunkte;
    }
  }
  return total;
}