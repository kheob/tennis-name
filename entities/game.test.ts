import { Game, Points, pointsToScore } from "./game";

describe("Game", () => {
  it("initialises a game at 0-0", () => {
    const game = new Game();
    expect(game.player1Score).toEqual(Points.LOVE);
    expect(game.player2Score).toEqual(Points.LOVE);
    expect(game.score()).toEqual("0-0");
  });

  it.each`
    player1Score        | player2Score        | expectedOutput
    ${Points.LOVE}      | ${Points.LOVE}      | ${"0-0"}
    ${Points.FIFTEEN}   | ${Points.LOVE}      | ${"15-0"}
    ${Points.FIFTEEN}   | ${Points.FIFTEEN}   | ${"15-15"}
    ${Points.THIRTY}    | ${Points.FIFTEEN}   | ${"30-15"}
    ${Points.THIRTY}    | ${Points.THIRTY}    | ${"30-30"}
    ${Points.FORTY}     | ${Points.THIRTY}    | ${"40-30"}
    ${Points.FORTY}     | ${Points.FORTY}     | ${"Deuce"}
    ${Points.ADVANTAGE} | ${Points.FORTY}     | ${"Advantage player 1"}
    ${Points.FORTY}     | ${Points.ADVANTAGE} | ${"Advantage player 2"}
  `(
    "returns $expectedOutput when then score is player 1: $player1Score, player 2: $player2Score",
    ({ player1Score, player2Score, expectedOutput }) => {
      const game = new Game();
      game.player1Score = player1Score;
      game.player2Score = player2Score;
      expect(game.score()).toEqual(expectedOutput);
    }
  );

  it.each`
    player       | expectedOutput
    ${"player1"} | ${"15-0"}
    ${"player2"} | ${"0-15"}
  `(
    "awards $player point when awardPoint is called",
    ({ player, expectedOutput }) => {
      const game = new Game();
      expect(game.score()).toEqual("0-0");

      game.awardPoint(player);
      expect(game.score()).toEqual(expectedOutput);
    }
  );

  it.each`
    player1Score        | player2Score    | gameOver
    ${Points.LOVE}      | ${Points.LOVE}  | ${false}
    ${Points.FORTY}     | ${Points.LOVE}  | ${true}
    ${Points.FORTY}     | ${Points.FORTY} | ${false}
    ${Points.ADVANTAGE} | ${Points.FORTY} | ${true}
  `(
    "returns $gameOver when the current score is $player1Score-$player2Score and player 1 scores a point",
    ({ player1Score, player2Score, gameOver }) => {
      const game = new Game();
      game.player1Score = player1Score;
      game.player2Score = player2Score;
      expect(game.awardPoint("player1")).toEqual(gameOver);
    }
  );

  it.each`
    player1Score    | player2Score        | gameOver
    ${Points.LOVE}  | ${Points.LOVE}      | ${false}
    ${Points.LOVE}  | ${Points.FORTY}     | ${true}
    ${Points.FORTY} | ${Points.FORTY}     | ${false}
    ${Points.FORTY} | ${Points.ADVANTAGE} | ${true}
  `(
    "returns $gameOver when the current score is $player1Score-$player2Score and player 2 scores a point",
    ({ player1Score, player2Score, gameOver }) => {
      const game = new Game();
      game.player1Score = player1Score;
      game.player2Score = player2Score;
      expect(game.awardPoint("player2")).toEqual(gameOver);
    }
  );

  it("resets the score to 40-40 if both players are advantage", () => {
    const game1 = new Game();
    game1.player1Score = Points.FORTY;
    game1.player2Score = Points.ADVANTAGE;
    game1.awardPoint("player1");
    game1.player1Score = Points.FORTY;
    game1.player2Score = Points.FORTY;

    const game2 = new Game();
    game2.player1Score = Points.ADVANTAGE;
    game2.player2Score = Points.FORTY;
    game2.awardPoint("player2");
    game2.player1Score = Points.FORTY;
    game2.player2Score = Points.FORTY;
  });
});

describe("pointsToScore", () => {
  it.each`
    points                  | score
    ${Points.LOVE}          | ${0}
    ${Points.FIFTEEN}       | ${15}
    ${Points.THIRTY}        | ${30}
    ${Points.FORTY}         | ${40}
    ${Points.ADVANTAGE}     | ${41}
    ${Points.ADVANTAGE_WIN} | ${42}
  `("returns score: $score for points: $point", ({ points, score }) => {
    expect(pointsToScore(points)).toEqual(score);
  });
});
