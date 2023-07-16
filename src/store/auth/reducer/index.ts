import { IAction } from "../../../ts/interfaces";
import { IAuthState } from "../../../ts/interfaces/auth_interfaces";
import { AUTH_FALSE, AUTH_TRUE, LOADING_START } from "../constants";

export const initialState : IAuthState = {
    isAuthenticated:true,
    token:null
}

export default function reducer(state : IAuthState = initialState,action:IAction) {
    switch(action.type) {
        case LOADING_START:
            return {
                ...state,
                loading:true
            }
        case "CHECKSS":
            console.log("Inside REducer");

            return {
                ...state,
                token:8999
            }
        case AUTH_TRUE:
            return {
                ...state,
                isSigned:true
            }
        case AUTH_FALSE:
            return {
                ...state,
                isSigned:false
            }
        default:
            return state;
    }
}