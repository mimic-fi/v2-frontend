export const ActionTypes = {
  SET_CHAIN_ID: 'SET_CHAIN_ID',
}

export const reducer = (state, action) => {
  console.log('v2-frontend state', state)
  console.log('v2-frontend action', action)
  switch (action.type) {

      case ActionTypes.SET_CHAIN_ID:
        return {
          ...state,
          chainId: action.chainId,
        }
    default:
      return state
  }
}
