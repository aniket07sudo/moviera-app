import { IUistate } from "../../store/ui/reducer";
import { IAuthState } from "./auth_interfaces";
import { IUserState } from "./user_interfaces";

export interface IAppState {
    auth:IAuthState,
    user:IUserState,
    ui:IUistate
}

export interface IAction {
    type:string,
    payload:any
}

export type Dispatch = React.Dispatch<IAction>