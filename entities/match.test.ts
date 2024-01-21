import { Match } from "./match";

const POINTS_TO_WIN_GAME = 4;
const GAMES_TO_WIN_MATCH = 6;

describe("Match", () => {
  it("errors on same player name", () => {
    expect(() => {
      new Match("player 1", "player 1");
    }).toThrow("player names must be different");
  });

  it("creates a new match with two players", () => {
    const match = new Match("player 1", "player 2");
    expect(match.player1.name).toEqual("player 1");
    expect(match.player2.name).toEqual("player 2");
  });

  it("initialises a match with a score of 0-0", () => {
    const match = new Match("player 1", "player 2");
    expect(match.score()).toEqual("0-0");
  });

  it.each`
    player        | expectedScore
    ${"player 1"} | ${"15-0"}
    ${"player 2"} | ${"0-15"}
  `("returns the correct score", ({ player, expectedScore }) => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy(player);
    expect(match.score()).toEqual("0-0, " + expectedScore);
  });

  it.each`
    player        | expectedGames
    ${"player 1"} | ${"1-0, 15-0"}
    ${"player 2"} | ${"0-1, 0-15"}
  `("updates the game count for $player", ({ player, expectedGames }) => {
    const match = new Match("player 1", "player 2");
    for (let i = 0; i < POINTS_TO_WIN_GAME + 1; i++) {
      match.pointWonBy(player);
    }
    expect(match.score()).toEqual(expectedGames);
  });

  it.each`
    player
    ${"player 1"}
    ${"player 2"}
  `("starts a new game if a game is over", ({ player }) => {
    const match = new Match("player 1", "player 2");
    for (let i = 0; i < POINTS_TO_WIN_GAME; i++) {
      match.pointWonBy(player);
    }
    expect(match.games).toHaveLength(2);
  });

  it.each`
    player
    ${"player 1"}
    ${"player 2"}
  `("throws error if game is already over", ({ player }) => {
    const match = new Match("player 1", "player 2");
    for (let i = 0; i < POINTS_TO_WIN_GAME * GAMES_TO_WIN_MATCH; i++) {
      match.pointWonBy(player);
    }
    expect(match.games).toHaveLength(6);

    expect(() => {
      match.pointWonBy(player);
    }).toThrow("game is already over");
  });

  it("throws an error if player name doesn't exist", () => {
    const match = new Match("player 1", "player 2");
    expect(() => {
      match.pointWonBy("player 3");
    }).toThrow("no player with name: player 3 in game");
  });
});
