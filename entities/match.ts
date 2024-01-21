import { Game, Points } from "./game";
import { Player } from "./player";

const GAMES_TO_WIN = 6;
const GAMES_TO_WIN_BY = 2;

export class Match {
  player1: Player;
  player2: Player;

  games: Game[];
  gamesWon: {
    player1: number;
    player2: number;
  };

  constructor(player1Name: string, player2Name: string) {
    if (player1Name === player2Name) {
      throw Error("player names must be different");
    }

    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.games = [new Game()];
    this.gamesWon = {
      player1: 0,
      player2: 0,
    };
  }

  private getCurrentGame() {
    return this.games[this.games.length - 1];
  }

  private getPlayerByName(name: string): "player1" | "player2" {
    if (this.player1.name === name) {
      return "player1";
    }
    if (this.player2.name === name) {
      return "player2";
    }
    throw Error(`no player with name: ${name} in game`);
  }

  private updateGamesWon(player: "player1" | "player2") {
    this.gamesWon[player]++;
  }

  private startNewGame() {
    this.games.push(new Game());
  }

  private isMatchOver(): boolean {
    const { player1: p1Wins, player2: p2Wins } = this.gamesWon;

    // either player wins with > 6 games and a different of > 2 games
    if (
      (p1Wins >= GAMES_TO_WIN && p1Wins >= p2Wins + GAMES_TO_WIN_BY) ||
      (p2Wins >= GAMES_TO_WIN && p2Wins >= p1Wins + GAMES_TO_WIN_BY)
    ) {
      return true;
    }

    return false;
  }

  pointWonBy(playerName: string) {
    this.getCurrentGame().awardPoint(this.getPlayerByName(playerName));

    const winner = this.getCurrentGame().getWinner();
    if (winner) {
      this.updateGamesWon(winner);
      if (!this.isMatchOver()) {
        this.startNewGame();
      }
    }
  }

  score() {
    let scoreString = `${this.gamesWon.player1}-${this.gamesWon.player2}`;

    const currentGame = this.getCurrentGame();
    if (
      currentGame.player1Score !== Points.LOVE ||
      currentGame.player2Score !== Points.LOVE
    ) {
      scoreString += `, ${currentGame.score()}`;
    }

    return scoreString;
  }
}
