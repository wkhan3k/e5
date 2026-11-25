import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

// Find the direction from the player to an adjacent tile.
function directionTo(
  player: Position,
  at: Position,
): Direction | undefined {
  const dx = at.x - player.x;
  const dy = at.y - player.y;

  if (dx === 1 && dy === 0) return "right";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 0 && dy === 1) return "down";
  if (dx === 0 && dy === -1) return "up";

  return undefined;
}

// Strategy: clicking a neighboring tile requests a move.
export const clickToMove: Controller = {
  label: "Click a neighboring tile",

  attach(session, board) {
    const stop = board.onTileClick((at) => {
      const player = session.getState().puzzle.player;
      const direction = directionTo(player, at);

      if (direction !== undefined) {
        session.dispatch({ kind: "move", direction });
      }
    });

    return stop;
  },
};
