import React from "react";

import ConnectUserWrittenWriting from "./ConnectUserWrittenWriting";
import ConnectUserWrittenReply from "./ConnectUserWrittenReply";

import '../scss/ConnectUserWritten.scss';

const ConnectUserWritten = ({ isOpenHotPlace, isOpenFreeBoard }) => {

    return (

        <>
            <div className='ua-header-user-written-box'>
                <div className='user-written-info-box'>
                    
                    {/* // TODO : 내가 쓴 글 단어 삭제 */}
                    {/* {isOpenHotPlace && <ConnectUserWrittenWriting /> } */}
                    {/* {isOpenFreeBoard && 
                        <>  
                            <ConnectUserWrittenWriting />
                            <ConnectUserWrittenReply /> 
                        </>
                    } */}
                </div>
            </div>
        </>
    )

};

export default ConnectUserWritten