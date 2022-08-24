import { FC, memo, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import './Menu.scss';
import MenuItem from "./MenuItem/MenuItem";
import { RouteNames } from "../../router";
import imageFollowing from '../../assets/menu/following.png';
import imageTopStreams from '../../assets/menu/topstreams.png';
import { useActions } from "../../hooks/useActions";

const Menu: FC = memo(() => {
    const { user } = useTypedSelector(state => state.auth);
    const [toggled, setToggled] = useState(false);
    const { logout } = useActions()

    const toggleHandler = () => {
        setToggled(prev => !prev);
    }

    const logoutHandler = () => {
        logout();
    }

    return (
        <div className={`menuContainer${toggled ? ' toggled' : ''}`}>
            <div className="menuContainer__toggle" onClick={toggleHandler}>
                <span className={`menuContainer__toggle_top${toggled ? ' toggled' : ''}`}></span>
                <span className={`menuContainer__toggle_bottom${toggled ? ' toggled' : ''}`}></span>
            </div>
            <div className="menuContainer__user">
                <span className="menuContainer__user_img"><img src={user.profileImage} /></span>
                <span className="menuContainer__user_username">{user.username}</span>
            </div>
            <div className="menuContainer__list">
                <div className="menuContainer__list_top">
                    <MenuItem title='Following' icon={imageFollowing} routepath={RouteNames.MAIN} />
                    <MenuItem title='Top streams' icon={imageTopStreams} routepath={RouteNames.TOP_STREAMS} />
                </div>
                <div className="menuContainer__list_bottom">
                    <div className="exitButton" onClick={logoutHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: 'rgba(251, 249, 249, 1)' }}>
                            <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                            <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                        </svg>
                        <span>Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Menu;