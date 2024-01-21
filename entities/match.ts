import { Player } from "./player";

export class Match {
  player1: Player;
  player2: Player;

  constructor(player1Name: string, player2Name: string) {
    if (player1Name === player2Name) {
      throw Error("player names must be different");
    }

    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  pointWonBy(playerName: string) {
    // TODO: implement
  }

  score() {
    // TODO: implement
  }
}
