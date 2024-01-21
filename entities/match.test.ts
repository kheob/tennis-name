import { Match } from "./match";
import { TieBreakGame } from "./tiebreakgame";

const POINTS_TO_WIN_GAME = 4;
const GAMES_TO_WIN_MATCH = 6;
const POINTS_TO_WIN_TIE_BREAK = 7;

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

  it("starts a tie break game if the game score is 6-6", () => {
    const match = new Match("player 1", "player 2");
    for (let j = 0; j < GAMES_TO_WIN_MATCH; j++) {
      for (let i = 0; i < POINTS_TO_WIN_GAME; i++) {
        match.pointWonBy("player 1");
      }
      for (let i = 0; i < POINTS_TO_WIN_GAME; i++) {
        match.pointWonBy("player 2");
      }
    }
    match.pointWonBy("player 1");
    expect(match.games).toHaveLength(13);
    expect(match.games[12]).toBeInstanceOf(TieBreakGame);
  });

  it("finishes the game at 7-6 if a tie break is won", () => {
    const match = new Match("player 1", "player 2");
    for (let j = 0; j < GAMES_TO_WIN_MATCH; j++) {
      for (let i = 0; i < POINTS_TO_WIN_GAME; i++) {
        match.pointWonBy("player 1");
      }
      for (let i = 0; i < POINTS_TO_WIN_GAME; i++) {
        match.pointWonBy("player 2");
      }
    }
    for (let i = 0; i < POINTS_TO_WIN_TIE_BREAK; i++) {
      match.pointWonBy("player 1");
    }
    expect(match.score()).toEqual("7-6");
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
