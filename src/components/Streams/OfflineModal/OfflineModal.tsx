import { FC, useEffect, useRef, useState } from "react";
import UserService from "../../../api/twitch/UserService";
import { IUser } from "../../../models/IUser";
import { getFavoritesStreams, openLinkStream, setFavoriteStream } from "../../../utils/streams";
import OfflineUser from "../OfflineUser/OfflineUser";
import './OfflineModal.scss';

interface OffileModalProps {
    setModal: (visible: boolean) => void
    user: IUser
    liveUsers: string[]
}

const OfflineModal: FC<OffileModalProps> = ({ setModal, user, liveUsers }) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [favUsers, setFavUsers] = useState<IUser[]>([]);
    const [otherUsers, setOtherUsers] = useState<IUser[]>([]);
    const pagination = useRef<string | undefined>('');

    useEffect(() => {
        fetchUsers()
        sortFavStreams();
    }, [users]);

    const fetchUsers = async () => {
        if (pagination.current === undefined) return;
        const data = await UserService.getUserFollowList(user.userId, pagination.current);
        pagination.current = data.pagination;
        setUsers(prevState => [...prevState, ...data.users.filter(user => !liveUsers.includes(user.userId))]);
    }

    const sortFavStreams = () => {
        const fav = getFavoritesStreams(user.userId);
        setFavUsers(users.filter(val => fav.includes(val.userId)));
        setOtherUsers(users.filter(val => !fav.includes(val.userId)));
    }

    const favoriteClickHandler = (streamerId: string, isFavorite: boolean) => {
        setFavoriteStream(user.userId, streamerId, isFavorite);
        sortFavStreams();
    }

    if (!favUsers.length && !otherUsers.length) {
        return (<div></div>)
    }

    return (
        <div className="offlineModalContainer" onClick={() => setModal(false)}>
            <div className="offlineModalContainer__users">
                {favUsers.map(user =>
                    <OfflineUser
                        user={user}
                        key={user.userId}
                        isFavorite={true}
                        favoriteClickHandler={favoriteClickHandler} />)}
                {otherUsers.map(user =>
                    <OfflineUser
                        user={user}
                        key={user.userId}
                        isFavorite={false}
                        favoriteClickHandler={favoriteClickHandler} />)}
            </div>
        </div>
    )
}

export default OfflineModal;