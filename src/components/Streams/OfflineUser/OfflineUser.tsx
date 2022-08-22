import React, { FC } from "react";
import { IUser } from "../../../models/IUser";
import { openLinkStream } from "../../../utils/streams";
import { Pin, Unpin } from "../../Buttons/Pins/Pins";
import './OfflineUser.scss';

interface OfflineUserProps {
    user: IUser
    isFavorite: boolean
    favoriteClickHandler: (streamerId: string, isFavorite: boolean) => void;
}

const OfflineUser: FC<OfflineUserProps> = ({ user, isFavorite, favoriteClickHandler }) => {

    const favPinHandler = () => {
        favoriteClickHandler(user.userId, !isFavorite);
    }

    const userClickHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        openLinkStream(user.username.toLocaleLowerCase());
    }

    return (
        <div className="offlineUserContainer"
            onClick={userClickHandler}
        >
            <div className="offlineUserContainer__profile">
                <img src={user.profileImage} />
                <span className="offlineUserContainer__profile_username">
                    {user.username}
                </span>
            </div>
            {!isFavorite ?
                <Pin pinHandler={favPinHandler} type="offline" />
                :
                <Unpin unpinHandler={favPinHandler} type="offline" />}
        </div>
    )
}

export default OfflineUser;