import { AppDispatch } from "../..";
import UserService from "../../../api/twitch/UserService";
import { IUser } from "../../../models/IUser";
import { removeAccesToken } from "../../../utils/headers";
import { AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setIsAuth: (payload: boolean): SetIsAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload }),
    setAuthIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setUser: (payload: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload }),
    setAuthError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    authorize: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setAuthIsLoading(true));
            const user = await UserService.getUser();
            if (user.userId) {
                dispatch(AuthActionCreators.setUser(user));
                dispatch(AuthActionCreators.setIsAuth(true));
            } else {
                dispatch(AuthActionCreators.setAuthError('Auth error'));
                removeAccesToken();
            }
        } catch (error) {
            dispatch(AuthActionCreators.setAuthError('Auth error'));
            removeAccesToken();
        }
    },
    logout: () => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsAuth(false));
        dispatch(AuthActionCreators.setUser({} as IUser))
        removeAccesToken();
    }
}