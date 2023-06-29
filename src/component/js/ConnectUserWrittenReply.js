import React, { useRef, useState } from "react";

import '../scss/ConnectUserWrittenReply.scss';

const ConnectUserWrittenReply = () => {

    const replyRef = useRef(null);
    const [isWrittenBoardClicked, setIsWrittenBoardClicked] = useState(false);

    const handleWrittenBoardClick = () => {
        setIsWrittenBoardClicked(prevState => !prevState);
    };

    return (
        <>
            <div
                className={`user-written-reply-box ${
                    isWrittenBoardClicked ? 'openClicked' : 'null'
                }`}
                onClick={handleWrittenBoardClick}
                >
                <div className="user-written-reply" ref={replyRef}>
                    <p>내가 쓴 ㅎㅇ댓글</p>
                </div>
            </div>
        </>
    )

};

export default ConnectUserWrittenReply;