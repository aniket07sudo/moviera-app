import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import AuthReducer from './auth/reducer'
import UserReducer from './user/reducer'
import {initialState as UserState} from './user/reducer'
import {combineReducers, createStore} from 'redux'
import {initialState as AuthState} from './auth/reducer'
import { Provider, createStoreHook } from 'react-redux'
import { IAppState } from '../ts/interfaces'
import UiReducer from './ui/reducer'

interface StoreProviderProps {
    children:string | JSX.Element | JSX.Element[]
}

export const rootReducer = combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    ui:UiReducer
})

export const store = createStore(rootReducer);

export const StoreProvider = ({children}:StoreProviderProps) => {
    
    return (
        <Provider store={store}> 
            {children}
        </Provider>
    )
}