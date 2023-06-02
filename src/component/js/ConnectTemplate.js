import React from 'react'
import ConnectHeader from './ConnectHeader';
import MenuRouter from '../../route/MenuRouter';

import '../scss/ConnectTemplate.scss';

const ConnectTemplate = () => {
  return (
    <div className='ConnectTemplate'>
      
      {/* 모든 페이지에 항시 출력(고정) */}
        <ConnectHeader/>
        <MenuRouter />
      
      {/* 로그인 모달창 */}
      {/* <ConnectLogin /> */}

      {/* 첫 메인화면 출력 */}
      {/* <ConnectMainPage /> */}

      {/* 고정 메인화면 틀 */}
      {/* <ConnectMainOutline/> */}

    </div>
  )
}

export default ConnectTemplate