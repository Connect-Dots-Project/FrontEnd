import React from 'react'

import '../scss/ConnectViewPlayList.scss';

const ConnectViewPlayList = ({ closeList }) => {
  return (
    <>

        <div id='ViewPlayListModal'>
            <div className='view-play-list-modal'>
                <button id='CloseBtn' onClick={ closeList }><p>X</p></button>

                <header className='list-img-box'>
                    <div className='list-img'><p>HOT Hits Korea</p></div>
                </header>

                <div className='view-play-list-main-wrapper'>
                    <div className='view-play-list-main-box'>

                        <div className='vpl-main'>

                            <div className='vpl-main-text-view-box'>
                                <div className='vpl-main-text-box'>
                                    <p>Hot Hits Korea 노래 모음입니다.</p>
                                    <p>음악은 30초간 미리듣기 가능합니다. (단, 지원하지 않는 음악 서비스도 있습니다.)</p>
                                </div>
                                <div className='vpl-main-view-box'>
                                    <div className='view-img'></div>
                                    <div className='view-count'><p>10</p></div>
                                </div>
                            </div>

                            <div className='vpl-main-list-wrapper'>
                                <div className='vpl-main-list-box'>


                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

                                    <button className='vpl-main-list'>
                                        <div className='list-info-img-box'>
                                            <div className='list-info-img'></div>
                                        </div>
                                        <div className='list-info'>
                                            <div className='list-info-title'><p>[노래제목]</p></div>
                                            <div className='list-info-singer'><p>[가수]</p></div>
                                        </div>
                                        <div className='list-play-btn-box'>
                                            <button className='list-play-btn'></button>
                                        </div>
                                    </button>

















                                </div>
                            </div>








                        </div>






                    </div>
                </div>
















            </div>
        </div>



    </>
  )
}

export default ConnectViewPlayList