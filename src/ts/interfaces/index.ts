import { IAuthState } from "./auth_interfaces";
import { IUserState } from "./user_interfaces";

export interface IAppState {
    auth:IAuthState,
    user:IUserState
}

export interface IAction {
    type:string,
    payload:any
}

export type Dispatch = React.Dispatch<IAction>