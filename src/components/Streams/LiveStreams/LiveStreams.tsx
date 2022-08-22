import { FC, useEffect, useRef, useState } from "react";
import StreamService from "../../../api/twitch/StreamService";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IStream } from "../../../models/IStream";
import { getFavoritesStreams, setFavoriteStream } from "../../../utils/streams";
import OfflineModal from "../OfflineModal/OfflineModal";
import Stream from "../Stream/Stream";
import './LiveStreams.scss';

const LiveStreams: FC = () => {
    const { user } = useTypedSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isOfflineModal, setIsOfflineModal] = useState(false);
    const liveStreams = useRef<IStream[]>([]);
    const [liveFavStreams, setLiveFavStreams] = useState([] as IStream[]);
    const [liveOtherStreams, setLiveOtherStreams] = useState([] as IStream[]);
    const refreshBtn = useRef<SVGSVGElement>(null);

    useEffect(() => {
        fetchStreams();
    }, []);

    const fetchStreams = async () => {
        setIsLoading(true);
        liveStreams.current = await StreamService.getLiveStreams();
        sortFavStreams();
    }

    const sortFavStreams = () => {
        const favUsers = getFavoritesStreams(user.userId);
        const favStreams = liveStreams.current.filter(stream => favUsers.includes(stream.user_id));
        const streams = liveStreams.current.filter(stream => !favUsers.includes(stream.user_id));
        setLiveFavStreams(favStreams);
        setLiveOtherStreams(streams);
        setIsLoading(false);
    }

    const setIsOfflineVisible = (visible: boolean) => {
        setIsOfflineModal(visible);
    }

    const refreshHandler = () => {
        fetchStreams();
        refreshBtn.current?.classList.add('rotate');
        setTimeout(() => {
            refreshBtn.current?.classList.remove('rotate');
        }, 1000);
    }

    const favoriteClickHandler = (streamerId: string, isFavorite: boolean) => {
        setFavoriteStream(user.userId, streamerId, isFavorite);
        sortFavStreams();
    }

    return (
        <div className="liveStreamsContainer">
            <div className="liveStreamsContainer__topbar">
                <svg
                    className="liveStreamsContainer__topbar_refresh"
                    onClick={refreshHandler}
                    ref={refreshBtn}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    style={{ msFilter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);" }}><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
                </svg>
                <button
                    className="liveStreamsContainer__topbar_offline"
                    onClick={() => setIsOfflineVisible(true)}
                >
                    offline
                </button>
            </div>
            <div className="liveStreamsContainer__streams">
                {isLoading ?
                    <span></span>
                    :
                    <>
                        <div className="liveStreamsContainer__streams_favStreams">
                            {liveFavStreams.map(stream =>
                                <Stream key={stream.id} stream={stream} isFavorite={true} favoriteClickHandler={favoriteClickHandler} />)}
                        </div>
                        <div className="liveStreamsContainer__streams_otherStreams">
                            {liveOtherStreams.map(stream =>
                                <Stream key={stream.id} stream={stream} isFavorite={false} favoriteClickHandler={favoriteClickHandler} />)}
                        </div>
                    </>
                }
            </div>
            {isOfflineModal && <OfflineModal
                setModal={setIsOfflineVisible}
                user={user}
                liveUsers={liveStreams.current.map(stream => stream.user_id)}
            />}
        </div>
    )
}

export default LiveStreams;