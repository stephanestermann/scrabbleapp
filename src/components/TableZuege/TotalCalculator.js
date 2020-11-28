export function getBetragProSpieler(num_spieler, scrabbleZuege) {
  let total=[];
  // 0: Total Punkte
  // 1: Anzahl Bingos
  // 2: Anzahl Anzweiflungen
  // 3: Anzahl falsche Anzweiflungen
  // 4: Spiel beendet
  // 5: Restpunkte
  // 6: Bonuspunkte
  // 7: Höchste Punktzahl eines Bingos
  // 8: Höchste Punktzahl ohne Bingo

  total[0]=0;
  total[1]=0;
  total[2]=0;      
  total[3]=0;            
  total[4]=0;
  total[5]=0;
  total[6]=0;
  total[7]=0;
  total[8]=0;

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
      total[7]=getHighestBincoScore(num_spieler, doppelzug, total[7]);
      total[8]=getHighestScoreWithoutBingo(num_spieler, doppelzug, total[8]);
    }
  }
  return total;
}

function getHighestBincoScore(num_spieler, doppelzug, highestBingoScore) {
  // Param Array total
  // 7: Höchste Punktzahl eines Bingos
  let result = highestBingoScore;
  if (doppelzug[num_spieler-1].bingo) {
    const bingoScore = parseInt(doppelzug[num_spieler-1].totalPunkteZug);
    result = bingoScore > highestBingoScore ? bingoScore : highestBingoScore;
  }
  return result;
}

function getHighestScoreWithoutBingo(num_spieler, doppelzug, highestScoreWithoutBingo) {
  // Param Array total
  // 8: Höchste Punktzahl ohne Bingo
  let result = highestScoreWithoutBingo;
  if (!doppelzug[num_spieler-1].bingo) {
    const score = parseInt(doppelzug[num_spieler-1].totalPunkteZug);
    result = score > highestScoreWithoutBingo ? score : highestScoreWithoutBingo;
  }
  return result;
}