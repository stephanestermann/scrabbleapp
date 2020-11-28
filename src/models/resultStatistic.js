export class ResultStatistic {
    constructor(scrabblerId) {
       this.scrabblerId = scrabblerId;
       this.totBegins = 0;
       this.totPoints = 0;
       this.totWins = 0;
       this.totBingos = 0;
       this.totDoubtes = 0;
       this.totWrongDoubtes = 0;       
       this.totCorrectDoubtes = 0;
       this.totGamesEnded = 0;
       this.totLeftPoints = 0;
       this.largestBingoScore = 0;
       this.largestNonBingoScore = 0;       
    }
    addStatistikResponse(responseStatistikData) {
      const vm = this;
      responseStatistikData.forEach(ele => {
         if(ele.scrabblerId === vm.scrabblerId) {
            vm.totBegins = ele.totBegins;
            vm.totPoints = ele.totPoints;
            vm.totWins = ele.totWins;
            vm.totBingos = ele.totBingos;
            vm.totDoubtes = ele.totDoubtes;
            vm.totCorrectDoubtes = ele.totCorrectDoubtes;
            vm.totWrongDoubtes = ele.totWrongDoubtes;
            vm.totGamesEnded = ele.totGamesEnded;
            vm.totLeftPoints = ele.totLeftPoints;
            vm.largestBingoScore = ele.largestBingoScore;
            vm.largestNonBingoScore = ele.largestNonBingoScore;         
         }         
      });
    }
    createStatistikTableWithHeaderOnTheLeftForTwoPlayers(anotherResultStatistic) {
       let newArray = [];
       newArray.push(this.getLabelValueObject('Name', this.getName(), anotherResultStatistic.getName()));
       newArray.push(this.getLabelValueObject('Anzahl begonnen', this.totBegins, anotherResultStatistic.totBegins));
       newArray.push(this.getLabelValueObject('Punktetotal', this.totPoints, anotherResultStatistic.totPoints));
       newArray.push(this.getLabelValueObject('Anzahl Siege', this.totWins, anotherResultStatistic.totWins));
       newArray.push(this.getLabelValueObject('Anzahl Bingos', this.totBingos, anotherResultStatistic.totBingos));
       newArray.push(this.getLabelValueObject('Anzahl Anzweiflungen', this.totDoubtes, anotherResultStatistic.totDoubtes));
       newArray.push(this.getLabelValueObject('Anzahl richtige Anzweiflungen', this.totCorrectDoubtes, anotherResultStatistic.totCorrectDoubtes));
       newArray.push(this.getLabelValueObject('Anzahl falsche Anzweiflungen', this.totWrongDoubtes, anotherResultStatistic.totWrongDoubtes));
       newArray.push(this.getLabelValueObject('Anzahl Spielbeendungen', this.totGamesEnded, anotherResultStatistic.totGamesEnded));
       newArray.push(this.getLabelValueObject('Total übrige Punkte', this.totLeftPoints, anotherResultStatistic.totLeftPoints));
       newArray.push(this.getLabelValueObject('Bester Bingo', this.largestBingoScore, anotherResultStatistic.largestBingoScore));
       newArray.push(this.getLabelValueObject('Bester Zug', this.largestNonBingoScore, anotherResultStatistic.largestNonBingoScore));

       return newArray
    }
    getLabelValueObject(label, valOne, valTwo) {
      return {label: label, valueOne: valOne, valueTwo: valTwo}
    }
    getName() {
       if (this.scrabblerId === 1) {
          return 'Anica';
       }
       return 'Stephan';
    }
}