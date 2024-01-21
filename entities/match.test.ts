import { Match } from "./match";

describe("Match", () => {
  it("errors on same player name", () => {
    expect(new Match("player 1", "player 1")).toThrow(
      "player names must be different"
    );
  });

  it("creates a new match with two players", () => {
    const match = new Match("player 1", "player 2");
    expect(match.player1.name).toEqual("player 1");
    expect(match.player2.name).toEqual("player 2");
  });
});
