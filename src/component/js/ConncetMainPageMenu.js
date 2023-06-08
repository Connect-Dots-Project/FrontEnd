import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import ConnectHotPlace from './ConnectHotPlace';
import ConnectFreeBoard from './ConnectFreeBoard';

import '../scss/ConnectMainPageMenu.scss';

const ConncetMainPageMenu = () => {
  return (
    <>
        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='HotPlace'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/contents/hot-place' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/contents/hot-place' className='cm-menu-text hotplace'>동네 Hot Place</Link>
            </div>
        </li>

        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='FreeBoard'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/contents/free-board' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/contents/free-board' className='cm-menu-text'>동네 자유게시판</Link>
            </div>
        </li>

        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='MakingFriends'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/' className='cm-menu-text'>동네 친구 만들기</Link>
            </div>
        </li>

        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='closingSale'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/' className='cm-menu-text'>동네 마감 세일</Link>
            </div>
        </li>

        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='StoreEvent'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/' className='cm-menu-text'>편의점 행사 정보</Link>
            </div>
        </li>
        
        {/* cm 메인 메뉴 리스트 */}
        <li className='cm-menu-list' id='MyPage'>
            {/* cm 메인 메뉴 사진 */}
            <Link to='/' id='list'></Link>
            {/* cm 메인 메뉴 텍스트 box */}
            <div className='cm-menu-text-box'>
                {/* cm 메인 메뉴 텍스트 */}
                <Link to='/' className='cm-menu-text'>마이페이지</Link>
            </div>
        </li>

        <Routes>
            <Route path='/contents/free-board' element={ <ConnectFreeBoard /> }></Route>
            <Route path='/contents/hot-place' element={ <ConnectHotPlace /> }></Route>
            <Route path='/contents/making-friends' element={ <ConnectHotPlace /> }></Route>
            <Route path='/contents/closing-sale' element={ <ConnectHotPlace /> }></Route>
            <Route path='/contents/store-sale' element={ <ConnectHotPlace /> }></Route>
            <Route path='/contents/my-page' element={ <ConnectHotPlace /> }></Route>
        </Routes>
    </>
  )
}

export default ConncetMainPageMenu