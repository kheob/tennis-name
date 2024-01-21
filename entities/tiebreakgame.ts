import { Game } from "./game";

export const POINTS_TO_WIN = 7;
export const POINTS_TO_WIN_BY = 2;

export class TieBreakGame extends Game {
  player1Score: number = 0;
  player2Score: number = 0;

  awardPoint(player: "player1" | "player2") {
    if (this.winner) {
      throw Error("game is already over");
    }

    switch (player) {
      case "player1":
        this.player1Score++;
        break;
      case "player2":
        this.player2Score++;
        break;
    }

    // either player wins with > 7 points and a different of > 2 points
    if (
      (this.player1Score >= POINTS_TO_WIN &&
        this.player1Score >= this.player2Score + POINTS_TO_WIN_BY) ||
      (this.player2Score >= POINTS_TO_WIN &&
        this.player2Score >= this.player1Score + POINTS_TO_WIN_BY)
    ) {
      this.winner = player;
    }
  }
}
