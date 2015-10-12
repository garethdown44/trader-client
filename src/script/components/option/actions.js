export const UPDATE_STRIKE = 'UPDATE_STRIKE';


export function updateStrike(value, legIndex) {
  return {
    type: UPDATE_STRIKE,
    value: value,
    legIndex: legIndex
  }
}