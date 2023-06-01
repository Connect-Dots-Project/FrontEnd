import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConnectHeader from './ConnectHeader';
import ConnectMainPage from './ConnectMainPage';
import ConnectHotPlace from './ConnectHotPlace';
import ConnectFriends from './ConnectFriends';
import ConnectChatting from './ConnectChatting';
import ConnectSales from './ConnectSales';
import ConnectStoreInfo from './ConnectStoreInfo';

import '../scss/ConnectTemplate.scss';
import ConnectMain from './ConnectMainPage';

const ConnectTemplate = () => {
  return (
    <div className='ConnectTemplate'>
      <BrowserRouter>

      {/* 모든 페이지에 항시 출력(고정) */}
        {/* <ConnectHeader>
          <Routes>
            <Route path='/' element={ <ConnectMainPage /> }></Route>
            <Route path='/nb-hot-place' element={ <ConnectHotPlace /> }></Route>
            <Route path='/nb-real-time-chatting' element={ <ConnectChatting /> }></Route>
            <Route path='/nb-making-friends' element={ <ConnectFriends /> }></Route>
            <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
            <Route path='/nb-store-event-info' element={ <ConnectStoreInfo /> }></Route>
          </Routes>
        </ConnectHeader> */}

      {/* 첫 메인화면 출력 */}
      {/* <ConnectMainPage /> */}

      <ConnectMain />
      


      </BrowserRouter>
    </div>
  )
}

export default ConnectTemplate