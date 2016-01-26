import positions from '../../blotter';

export const RECEIVE_POSITION = 'RECEIVE_POSITION';

export function subscribePositions() {
  return function (dispatch) {
    return positions.subscribe(position => {
      return dispatch(receivePosition(position));
    })
  };
}

export function receivePosition(position) {
  return {
    type: RECEIVE_POSITION,
    position: position
  }
}