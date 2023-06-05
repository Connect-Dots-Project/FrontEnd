import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConnectMainPage from '../component/js/ConnectMainPage';
import ConnectHotPlace from '../component/js/ConnectHotPlace';
import ConnectFriends from '../component/js/ConnectFriends';
import ConnectSales from '../component/js/ConnectSales';
import ConnectStoreInfo from '../component/js/ConnectStoreInfo';
import ConnectLogin from '../component/js/ConnectLogin';
import ConnectMainOutline from '../component/js/ConnectMainOutline';
import ConnectFreeBoard from '../component/js/ConnectFreeBoard';
import ConnectGlobalChatting from '../component/js/ConnectGlobalChatting';

const MenuRouter = () => {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <ConnectMainPage />
          <ConnectLogin />
        </>
      }></Route>
      
      <Route path="/" element={
        <>
          <ConnectMainOutline />
          <ConnectGlobalChatting />
        </>
      }>
        <Route path='/nb-hot-place' element={ <ConnectHotPlace /> }></Route>
        <Route path='/nb-real-time-chatting' element={ <ConnectFreeBoard /> }></Route>
        <Route path='/nb-making-friends' element={ <ConnectFriends /> }></Route>
        <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
        <Route path='/nb-store-event-info' element={ <ConnectStoreInfo /> }></Route>
      </Route>
    </Routes>
  );
}

export default MenuRouter;
