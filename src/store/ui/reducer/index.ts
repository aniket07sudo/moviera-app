import { IAction } from "../../../ts/interfaces"

export interface IUistate {
    playerModal:boolean,
    playerUrl:string,
    deviceWidth:number,
    deviceHeight:number;
}

export const initialState : IUistate = {
    playerModal:false,
    playerUrl:'',
    deviceWidth:0,
    deviceHeight:0
}

export default function UiReducer(state:IUistate = initialState,action:IAction) {
    switch(action.type) {
        case "PLAYER_MODAL":
            return {
                ...state,
                playerUrl:action.payload.url,
                playerModal:action.payload.modalState
            }
        case "SET_DIMENSIONS":
            return {
                ...state,
                deviceWidth:action.payload.deviceWidth,
                deviceHeight:action.payload.deviceHeight
            }
        default:
            return state
        
    }
}