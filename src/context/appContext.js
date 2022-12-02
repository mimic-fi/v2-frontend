import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { reducer, ActionTypes } from './appReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_CHAIN_ID } from '../constants/chainInfo'

const initialContext = {
  chainId: DEFAULT_CHAIN_ID,
  version: '0.0.1' // TODO: manage app version for future updates
}

const StateContext = createContext(initialContext)
const DispatchContext = createContext(undefined)

export const AppProvider = ({ children }) => {
  const [storage, setStorage] = useLocalStorage('appManager')

  const [state, dispatch] = useReducer(
    reducer,
    storage ? storage : initialContext
  )

  useEffect(() => {
    setStorage({ ...initialContext, chainId: state.chainId })
  }, [state]); // eslint-disable-line

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(StateContext)
}

export const useAppDispatch = () => {
  const dispatch = useContext(DispatchContext)

  if (dispatch === undefined) {
    throw new Error('useAppDispatch must be used within a Provider')
  }

  const updateChainId = useCallback(
    (chainId) => {
      dispatch({ type: ActionTypes.SET_CHAIN_ID, chainId: chainId })
    },
    [dispatch]
  )

  return useMemo(
    () => ({
      updateChainId,
    }),
    [updateChainId]
  )
}
