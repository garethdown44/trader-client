export const ADD_TILE = 'ADD_TILE';

export function addTile(tile) {
  return {
    type: ADD_TILE,
    tile: tile
  }
}