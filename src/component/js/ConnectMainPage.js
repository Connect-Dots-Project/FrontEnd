import React from 'react'

import '../scss/ConnectMainPage.scss';

const ConnectMainPage = () => {
  return (
    // connect-main-wrapper
    <div className='connect-main-wrapper'>
        {/* main 광고 box */}
        {/* cm = connect-main */}
        <div className='cm-ad-box'>
            {/* cm 메인 광고1 */}
            <div className='cm-ad'>
                <a href='#' id='cm-ad1'></a>
            </div>
            {/* cm 메인 광고2 */}
            <div className='cm-ad'>
                <a href='#' id='cm-ad2'></a>
            </div>
        </div> {/* end cm-ad-box */}

        {/* cm 메인 메뉴 전체 */}
        <div className='cm-menu-wrapper'>
            {/* cm 메인 메뉴 box */}
            <div className='cm-menu-box'>
                {/* cm 메인 메뉴 */}
                <ul className='cm-menu'>





                    {/* cm 메인 메뉴 리스트 */}
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>동네 Hot Place</a>
                        </div>
                    </li>
                    {/* cm 메인 메뉴 리스트 */}
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>동네 실시간 채팅</a>
                        </div>
                    </li>
                    {/* cm 메인 메뉴 리스트 */}
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>동네 친구 만들기</a>
                        </div>
                    </li>
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>동네 마감 세일</a>
                        </div>
                    </li>
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>편의점 행사 정보</a>
                        </div>
                    </li>
                    <li className='cm-menu-list'>
                        {/* cm 메인 메뉴 사진 */}
                        <a href='#' id='list'></a>
                        {/* cm 메인 메뉴 텍스트 box */}
                        <div className='cm-menu-text-box'>
                            {/* cm 메인 메뉴 텍스트 */}
                            <a href='#' className='cm-menu-text'>마이페이지</a>
                        </div>
                    </li>







                </ul>
            </div>
        </div>
    </div>
  )
}

export default ConnectMainPage