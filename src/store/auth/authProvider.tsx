import { createContext, useContext, useMemo, useReducer } from "react"
import reducer , {initialState} from "./reducer";


export const AuthContext = createContext(initialState);

export const AuthDispatchContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}

export default function AuthContextProvider(props) {

    const [state,dispatch] = useReducer(reducer,initialState);

    const value = useMemo(() => state,[state,dispatch])

    return (
        <AuthContext.Provider value={value}>
            <AuthDispatchContext.Provider value={dispatch}>
                {props.children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}