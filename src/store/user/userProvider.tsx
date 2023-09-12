// import React ,{createContext,useContext , useReducer , useMemo} from 'react'
// import reducer from './reducer';
// import {initialState} from './reducer'

// interface UserProps {
//     id:string,
//     username:string,
//     email:string,
//     password:string
// }

// export const UserContext = createContext<any>(initialState);

// export const UserDispatchContext = createContext({});

// export function useUser() {
//     return useContext(UserContext)
// }

// export function useUserDispatch() {
//     return useContext(UserDispatchContext)
// }

// export default function UserContextProvider(props) {
//     const [state,dispatch] = useReducer<any>(reducer,initialState);

//     const value = useMemo(() => state,[state,dispatch])

//     return (
//         <UserContext.Provider value={value} >
//             <UserDispatchContext.Provider value={dispatch}>
//                 {props.children}
//             </UserDispatchContext.Provider>
//         </UserContext.Provider>
//     )
// }
