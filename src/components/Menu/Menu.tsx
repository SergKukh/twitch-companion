import { FC, memo } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import './Menu.scss';
import MenuItem from "./MenuItem/MenuItem";
import { RouteNames } from "../../router";
import imageFollowing from '../../assets/menu/following.png';
import imageTopStreams from '../../assets/menu/topstreams.png';

const Menu: FC = memo(() => {
    const { user } = useTypedSelector(state => state.auth);
    console.log('render Menu')

    return (
        <div className="menuContainer">
            <div className="menuContainer__user">
                <span className="menuContainer__user_img"><img src={user.profileImage} /></span>
                <span className="menuContainer__user_username">{user.username}</span>
            </div>
            <div className="menuContainer__list">
                <MenuItem title='Following' icon={imageFollowing} routepath={RouteNames.MAIN} />
                <MenuItem title='Top streams' icon={imageTopStreams} routepath={RouteNames.TOP_STREAMS} />
            </div>
        </div>
    )
})

export default Menu;