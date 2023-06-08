import React from 'react'

import '../scss/ConnectMainPage.scss';
import { Link } from 'react-router-dom';
import ConncetMainPageMenu from './ConncetMainPageMenu';

const ConnectMainPage = () => {

  return (
    // connect-main-wrapper
    <div className='connect-main-wrapper'>
        {/* main 광고 box */}
        {/* cm = connect-main */}
        <div className='cm-ad-box'>
            {/* cm 메인 광고1 */}
            <div className='cm-ad'>
                <Link href='#' id='cm-ad1'></Link>
            </div>
            {/* cm 메인 광고2 */}
            <div className='cm-ad'>
                <Link href='#' id='cm-ad2'></Link>
            </div>
        </div> {/* end cm-ad-box */}

        {/* cm 메인 메뉴 전체 */}
        <div className='cm-menu-wrapper'>
            {/* cm 메인 메뉴 box */}
            <div className='cm-menu-box'>
                {/* cm 메인 메뉴 */}
                <ul className='cm-menu'>
                    <ConncetMainPageMenu />
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ConnectMainPage