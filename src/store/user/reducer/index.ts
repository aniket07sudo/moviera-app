import { IAction } from "../../../ts/interfaces"
import { IUserState } from "../../../ts/interfaces/user_interfaces"


export const initialState : IUserState = {
    id:null,
    username:null,
    email:null,
    password:null,
}

export default function reducer(state:IUserState = initialState,action:IAction) {
    switch(action.type) {
        case "CHECKY":
            return {
                ...state,
                id:'Aniket'
            }
        default:
            return state
        
    }
}