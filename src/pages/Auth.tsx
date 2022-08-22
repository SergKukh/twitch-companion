import { FC, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setAccessToken } from "../utils/headers";
import './styles/Auth.scss';

const Auth: FC = () => {
    const { authorize } = useActions();
    const { isLoading } = useTypedSelector(state => state.auth);

    useEffect(() => {
        const url = window.location.href.replace('#', '?');
        const search = new URL(url).search;
        const params = new URLSearchParams(search);
        const access_token = params.get('access_token');
        if (access_token) {
            setAccessToken(access_token);
            auth();
        }
    }, []);

    const auth = async () => {
        await authorize();
    }

    return (
        <div className="auth_container">
            {isLoading && <Loader />}
        </div>
    )
}

export default Auth;