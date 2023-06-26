// import React, { useState } from 'react'
// import ConnectUserActivityHotPlace from './ConnectUserActivityHotPlace';
// import ConnectUserActivityFreeBoard from './ConnectUserActivityFreeBoard';

// import '../scss/ConnectUserActivity.scss';
// import { useRef } from 'react';
// import ConnectUserWrittenWriting from './ConnectUserWrittenWriting';
// import ConnectUserWrittenReply from './ConnectUserWrittenReply';

// const ConnectUserActivity = () => {

//     const [isOpenHotPlace, setIsOpenHotPlace] = useState(false);
//     const [isOpenFreeBoard, setIsOpenFreeBoard] = useState(false);
//     const [isOpenWrittenReply, setIsOpenWrittenReply] = useState(false);
//     const [isWrittenBoardClicked, setIsWrittenBoardClicked] = useState(false);
//     const replyRef = useRef(null);

//     const openHotPlace = e => {
//         setIsOpenHotPlace(true);
//         setIsOpenFreeBoard(false);
//     };
    
//     const openFreeBoard = e => {
//         setIsOpenFreeBoard(true);
//         setIsOpenWrittenReply(true);
//         setIsOpenHotPlace(false);
//     };
    
//     const handleWrittenBoardClick = () => {
//         setIsWrittenBoardClicked(prevState => !prevState);
//     };
    
//     return (
//         <>
        

        
//         <div id='UserActivityWrapper'>
//             <div className='user-activity-box'>

//                 <div className='ua-header-wrapper'>
//                     <div className='ua-header-box'>
//                         <div className='ua-header-wrapper'>
//                             <div className='ua-btn-box'>
//                                 <button 
//                                     className='ua-btn' 
//                                     id='HotPlace'
//                                     onClick={ openHotPlace }
//                                     >
//                                     <p>Hot Place</p>
//                                 </button>
//                                 <button 
//                                     className='ua-btn' 
//                                     id='FreeBoard'
//                                     onClick={ openFreeBoard }
//                                     >
//                                     <p>자유게시판</p>
//                                 </button>
//                             </div>

//                         <div className='ua-header-user-written-box'>
//                             <div className='user-written-info-box'>

//                             <div
//                                 className={`user-written-board-box ${
//                                     isWrittenBoardClicked ? 'openClicked' : 'closeClicked'
//                                 }`}
//                                 onClick={handleWrittenBoardClick}
//                                 >

//                                 <div className="user-written-board">
//                                     <p>내가 쓴 글</p>
//                                 </div>
//                                 </div>
//                                 {isOpenFreeBoard && (
//                                     <div
//                                     className={`user-written-reply-box ${
//                                         isWrittenBoardClicked ? 'closeClicked' : 'openClicked'
//                                     }`}
//                                     onClick={handleWrittenBoardClick}
//                                     >
//                                 <div className="user-written-reply" ref={replyRef}>
//                                     <p>내가 쓴 댓글</p>
//                                 </div>
//                                 </div>
//                                 )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             <div className='ua-main-wrapper'>
//                 <div className='ua-main-box'>

//                 {isOpenHotPlace && <ConnectUserActivityHotPlace />}
//                 {isOpenFreeBoard &&
//                     <>
//                         <ConnectUserActivityFreeBoard />
//                     </>
//                 }

//                 </div>
//             </div>

//             </div>
//         </div>
//         </>
//     );
// };

// export default ConnectUserActivity