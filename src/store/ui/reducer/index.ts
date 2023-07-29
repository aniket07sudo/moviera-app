import { IAction } from "../../../ts/interfaces"

export interface IUistate {
    playerModal:boolean,
    playerUrl:string
}

export const initialState : IUistate = {
    playerModal:false,
    playerUrl:''
}

export default function UiReducer(state:IUistate = initialState,action:IAction) {
    switch(action.type) {
        case "PLAYER_MODAL":
            return {
                ...state,
                playerUrl:action.payload.url,
                playerModal:action.payload.modalState
            }
        // case ""
        default:
            return state
        
    }
}