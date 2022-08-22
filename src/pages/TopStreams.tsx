import { FC, useEffect, useRef, useState } from "react";
import StreamService from "../api/twitch/StreamService";
import Stream from "../components/Streams/Stream/Stream";
import { IStream } from "../models/IStream";
import './styles/TopStreams.scss';

const TopStreams: FC = () => {
    const [streams, setStreams] = useState<IStream[]>([]);
    const pagination = useRef('');
    const observeElement = useRef(null);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        connectObserverPagination();
    }, []);

    const connectObserverPagination = () => {
        if (observer.current) observer.current.disconnect();
        const callback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
            if (entries[0].isIntersecting) {
                fetchStreams();
            }
        };
        observer.current = new IntersectionObserver(callback);
        if (observeElement.current) {
            observer.current.observe(observeElement.current);
        }
    }

    const fetchStreams = async () => {
        const data = await StreamService.getTopStreams(pagination.current);
        pagination.current = data.pagination;
        setStreams(prev => [...prev, ...data.streams]);
        connectObserverPagination();
    }

    return (
        <div className="topStreamsContainer">

            <div className="topStreamsContainer__streams">
                {streams.map(val =>
                    <Stream stream={val} key={val.id} />)}

            </div>
            <div style={{ height: '5px', width: '100%' }} ref={observeElement}></div>
        </div>
    )
}

export default TopStreams;