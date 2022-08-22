import { FC, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../router";
import { getAccessToken, getClientId } from "../utils/headers";
import './styles/Login.scss';

const Login: FC = () => {
    const { authorize } = useActions();
    const { isLoading } = useTypedSelector(state => state.auth);

    const authParams = {
        client_id: getClientId(),
        redirect_uri: `${window.location.origin}${RouteNames.AUTH}`,
        response_type: 'token',
        scope: 'user:read:follows'
    }

    const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');

    const loginHandler = (): void => {
        const params = new URLSearchParams(authParams);
        authUrl.search = params.toString();
        window.open(authUrl.toString(), '_self');
    }

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            auth();
        }
    }, []);

    const auth = async () => {
        await authorize();
    }

    return (
        <div className="login_container">
            {isLoading ?
                <Loader />
                :
                <button
                    className="login_btn_twitchLogin"
                    onClick={loginHandler}
                >
                    <span>login with</span>
                    <span className="login_btn_twitchLogin__icon"></span>
                </button>}
        </div>
    )
}

export default Login;