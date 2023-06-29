import React, { useState } from "react";

import '../scss/ConnectUserWrittenWriting.scss';
import ConnectUserWrittenWritingData from "./ConnectUserWrittenWritingData";

const ConnectUserWrittenWriting = () => {

    const [isWrittenBoardClicked, setIsWrittenBoardClicked] = useState(false);
    const [isOpenWrittenWriting, setIsOpenWrittenWriting] = useState(false);

    const handleWrittenBoardClick = () => {
        setIsWrittenBoardClicked(prevState => !prevState);
    };

    const clickWrittenWriting = e => {
        setIsOpenWrittenWriting(true);
    };

    return (
        <>
            <div
                className={`user-written-board-box ${
                    isWrittenBoardClicked ? 'openClicked' : 'null'
                }`}
                onClick={handleWrittenBoardClick}
            >
                <div className="user-written-board" onClick={ clickWrittenWriting }>
                    <p>내가 쓴 글</p>
                </div>
            </div>
        </>
    )

};

export default ConnectUserWrittenWriting;