import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import ConnectHotPlace from '../component/js/ConnectHotPlace';
// import ConnectFriends from '../component/js/ConnectFriends';
// import ConnectSales from '../component/js/ConnectSales';
// import ConnectStoreInfo from '../component/js/ConnectStoreInfo';
// import ConnectFreeBoard from '../component/js/ConnectFreeBoard';
import ConnectMainPage from '../component/js/ConnectMainPage';
import ConnectLogin from '../component/js/ConnectLogin';
import ConnectMainOutline from '../component/js/ConnectMainOutline';

const MenuRouter = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={ 
          <>
            <ConnectMainPage />
            <ConnectLogin />
          </>
        }></Route>
      </Routes>
      <ConnectMainOutline />

      {/* <Routes>
          <Route path='/nb-hot-place' element={ <ConnectHotPlace /> }></Route>
          <Route path='/nb-real-time-chatting' element={ <ConnectFreeBoard /> }></Route>
          <Route path='/nb-making-friends' element={ <ConnectFriends /> }></Route>
          <Route path='/nb-closing-sale' element={ <ConnectSales /> }></Route>
          <Route path='/nb-store-event-info' element={ <ConnectStoreInfo /> }></Route>
      </Routes> */}
    </>
  );
}

export default MenuRouter;
