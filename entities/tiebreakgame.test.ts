import { POINTS_TO_WIN, POINTS_TO_WIN_BY, TieBreakGame } from "./tiebreakgame";

describe("TieBreakGame", () => {
  it("errors if awardPoint is called on finished game", () => {
    const game = new TieBreakGame();
    for (let i = 0; i < POINTS_TO_WIN; i++) {
      game.awardPoint("player1");
    }
    expect(() => {
      game.awardPoint("player1");
    }).toThrow("game is already over");
  });

  it.each`
    player
    ${"player1"}
    ${"player2"}
  `("sets a winner if $player scores POINTS_TO_WIN", ({ player }) => {
    const game = new TieBreakGame();
    for (let i = 0; i < POINTS_TO_WIN; i++) {
      game.awardPoint(player);
    }
    expect(game.getWinner()).toEqual(player);
  });

  it.each`
    winningPlayer | losingPlayer
    ${"player1"}  | ${"player2"}
    ${"player2"}  | ${"player1"}
  `(
    "doesn't set a winner if $player scores POINTS_TO_WIN_BY more points than the other player",
    ({ winningPlayer, losingPlayer }) => {
      const game = new TieBreakGame();
      for (let i = 0; i < POINTS_TO_WIN - POINTS_TO_WIN_BY + 1; i++) {
        game.awardPoint(losingPlayer);
      }
      for (let i = 0; i < POINTS_TO_WIN; i++) {
        game.awardPoint(winningPlayer);
      }
      expect(game.getWinner()).toBeUndefined();
    }
  );
});
