import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import './MenuItem.scss';

interface MenuItemProps {
    title: string
    icon: string
    routepath: string
}

const MenuItem: FC<MenuItemProps> = memo(({ title, icon, routepath }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(routepath);
    }

    return (
        <div className="menuItemContainer" onClick={clickHandler}>
            <div className="menuItemContainer__img">
                <img src={icon} />
            </div>
            <div className="menuItemContainer__title">{title}</div>
        </div>
    )
})

export default MenuItem;