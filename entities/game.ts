export enum Points {
  LOVE = 0,
  FIFTEEN = 1,
  THIRTY = 2,
  FORTY = 3,
  ADVANTAGE = 4,
  ADVANTAGE_WIN = 5,
}

export function pointsToScore(points: Points): number {
  switch (points) {
    case Points.LOVE:
      return 0;
    case Points.FIFTEEN:
      return 15;
    case Points.THIRTY:
      return 30;
    case Points.FORTY:
      return 40;
    case Points.ADVANTAGE:
      return 41;
    case Points.ADVANTAGE_WIN:
      return 42;
  }
}

export class Game {
  player1Score: Points = Points.LOVE;
  player2Score: Points = Points.LOVE;
  protected winner?: "player1" | "player2";

  getWinner() {
    return this.winner;
  }

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

    const eitherPlayerWin =
      this.player1Score === Points.ADVANTAGE_WIN ||
      this.player2Score === Points.ADVANTAGE_WIN;
    const player1Win =
      this.player1Score === Points.ADVANTAGE &&
      this.player2Score !== Points.FORTY;
    const player2Win =
      this.player2Score === Points.ADVANTAGE &&
      this.player1Score !== Points.FORTY;

    if (eitherPlayerWin || player1Win || player2Win) {
      this.winner = player;
    }

    // if both advantage, set to 40-40
    if (
      this.player1Score === Points.ADVANTAGE &&
      this.player2Score === Points.ADVANTAGE
    ) {
      this.player1Score = Points.FORTY;
      this.player2Score = Points.FORTY;
    }
  }

  score() {
    if (
      this.player1Score === Points.FORTY &&
      this.player2Score === Points.FORTY
    ) {
      return "Deuce";
    } else if (
      this.player1Score === Points.ADVANTAGE &&
      this.player2Score === Points.FORTY
    ) {
      return "Advantage player 1";
    } else if (
      this.player2Score === Points.ADVANTAGE &&
      this.player1Score === Points.FORTY
    ) {
      return "Advantage player 2";
    }

    return `${pointsToScore(this.player1Score)}-${pointsToScore(
      this.player2Score
    )}`;
  }
}
