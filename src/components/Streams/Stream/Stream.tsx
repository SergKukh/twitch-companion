import React, { FC, useEffect, useRef, useState } from "react";
import { IStream } from "../../../models/IStream";
import { openLinkStream } from "../../../utils/streams";
import { Pin, Unpin } from "../../Buttons/Pins/Pins";
import './Stream.scss';

interface StreamProps {
    stream: IStream
    isFavorite?: boolean
    favoriteClickHandler?: (streamerId: string, isFavorite: boolean) => void
}

const Stream: FC<StreamProps> = ({ stream, isFavorite, favoriteClickHandler }) => {
    const [time, setTime] = useState('');
    const tooltip = useRef(document.createElement('div'));
    const timeoutId: any = useRef();
    const mouseCoords = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let secs = Math.floor((Date.now() - Date.parse(stream.started_at)) / 1000);
        setTime(getFormattedDate(secs));
        setInterval(() => {
            secs += 1;
            setTime(getFormattedDate(secs));
        }, 1000);
    }, []);

    const getFormattedDate = (secs: number): string => {
        const hrs = Math.floor(secs / 3600);
        const mins = Math.floor((secs - (hrs * 3600)) / 60);
        const seconds = secs - (hrs * 3600) - (mins * 60)
        return `${hrs}:${mins.toString().length < 2 ? '0' + mins : mins}:${seconds.toString().length < 2 ? '0' + seconds : seconds}`
    }

    const getFormattedViewerCount = (viewerCount: number): string => {
        return viewerCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getSizedThumbnail = (url: string): string => {
        const width = 300;
        url = url.replace('{width}', `${width}`);
        url = url.replace('{height}', `${Math.round(width / 1.77)}`);
        return url;
    }

    const titleMouseEnterHandler = (event: React.MouseEvent) => {
        timeoutId.current = setTimeout(() => {
            tooltip.current = document.createElement('div');
            tooltip.current.className = 'tooltip';
            tooltip.current.innerText = stream.title || '';
            tooltip.current.style.left = mouseCoords.current.x + 15 + 'px';
            tooltip.current.style.top = mouseCoords.current.y - 15 + 'px';
            document.body.appendChild(tooltip.current);
        }, 500);
    }

    const titleMouseLeaveHandler = (event: React.MouseEvent) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = undefined;
        };
        if (tooltip) tooltip.current.remove();
    }

    const titleMouseMoveHandler = (event: React.MouseEvent) => {
        mouseCoords.current.x = event.pageX;
        mouseCoords.current.y = event.pageY;
    }

    const streamClickHandler = () => {
        openLinkStream(stream.user_login);
    }

    const favClickHanler = () => {
        if (favoriteClickHandler !== undefined) {
            favoriteClickHandler(stream.user_id, !isFavorite);
        }
    }

    return (
        <div className="streamContainer" onClick={streamClickHandler}>
            <div className="streamContainer__top">
                <span className="streamContainer__top_username">{stream.user_name}</span>
                <span className="streamContainer__top_viewerCount">{getFormattedViewerCount(stream.viewer_count)}</span>
            </div>
            <span className="streamContainer__thumbnail">
                <img src={getSizedThumbnail(stream.thumbnail_url || '')} />
                <span className="streamContainer__thumbnail_time">{time}</span>
                {isFavorite !== undefined ?
                    !isFavorite ?
                        <Pin pinHandler={favClickHanler} type='online' />
                        :
                        <Unpin unpinHandler={favClickHanler} type='online' />

                    :
                    <></>}
            </span>
            <div className="streamContainer__bottom">
                <span className="streamContainer__bottom_gameName">{stream.game_name}</span>
                <span
                    className="streamContainer__bottom_title"
                    onMouseEnter={titleMouseEnterHandler}
                    onMouseLeave={titleMouseLeaveHandler}
                    onMouseMove={titleMouseMoveHandler}
                >{stream.title}
                </span>
            </div>
        </div>
    )
}

export default Stream;