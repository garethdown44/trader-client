export const ADD_TILE = 'ADD_TILE';
export const REMOVE_TILE = 'REMOVE_TILE';

export function addTile(product) {
  return {
    type: ADD_TILE,
    product: product
  }
}

export function removeTile(tileId) {
  return {
    type: REMOVE_TILE,
    tileId: tileId
  }
}