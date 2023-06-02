import React from 'react'
import ConnectMainPage from '../component/js/ConnectMainPage';
import ConnectHotPlace from '../component/js/ConnectHotPlace';
import ConnectFriends from '../component/js/ConnectFriends';
import ConnectChatting from '../component/js/ConnectChatting';
import ConnectSales from '../component/js/ConnectSales';
import ConnectStoreInfo from '../component/js/ConnectStoreInfo';
import ConnectLogin from '../component/js/ConnectLogin';
import ConnectMainOutline from '../component/js/ConnectMainOutline';
import {  Routes, Route } from 'react-router-dom';

const MenuRouter = () => {
  return (
    <Routes>
        <Route path="/" element={
            <>
                <ConnectMainPage />
                <ConnectLogin />
            </>
        }
      ></Route>
        {/* 공통 부모 */}
        <Route path='/' element={ <ConnectMainOutline /> }>
          <Route path='/nb-hot-place' element={ <ConnectHotPlace /> }></Route>
          <Route path='/nb-real-time-chatting' element={ <ConnectChatting /> }></Route>
          <Route path='/nb-making-friends' element={ <ConnectFriends /> }></Route>
          <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
        </Route>
          <Route path='/nb-store-event-info' element={ <ConnectStoreInfo /> }></Route>
    </Routes>
  )
}

export default MenuRouter