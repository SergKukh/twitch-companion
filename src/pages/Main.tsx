import { FC, useEffect, useState } from "react";
import LiveStreams from "../components/Streams/LiveStreams/LiveStreams";
import './styles/Main.scss';

const Main: FC = () => {
    return (
        <div className="main_container">
            <LiveStreams />
        </div>
    )
}

export default Main;