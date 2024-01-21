import { Player } from "./player";

describe("Player", () => {
  it("initialises a player with a name", () => {
    const player = new Player("Bai Chan");
    expect(player.name).toEqual("Bai Chan");
  });
});
