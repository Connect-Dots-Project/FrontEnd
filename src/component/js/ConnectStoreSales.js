import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Link, useNavigate } from 'react-router-dom';

import '../scss/ConnectStoreSales.scss';
import ConnectMainOutline from "./ConnectMainOutline";

const ConnectStoreSales = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isClickBackBtn, setIsClickBackBtn] = useState(false);

  const navigate = useNavigate();
  // const clickBackBtn = e => {
  //   const $clickBackBtn = document.getElementById('StoreSalesWrapper');
  //   $clickBackBtn.style.animation = 'clickBackBtn 2s forwards 1';
  //
  //   setTimeout(() => {
  //     // $clickBackBtn.style.animation = null;
  //     setIsClickBackBtn(true);
  //     // window.location.href = '/';
  //     // navigate(-1);
  //   }, 1000);
  //
  // };

  return (
  <>
    <div id='StoreSalesWrapper'>
    <div className='store-sales-box'>
      {/*<div className='back-btn-box'>*/}
      {/*  <button id='BackBtn' onClick={clickBackBtn}></button>*/}
      {/*</div>*/}

      <div className='ss-select-list-box'>
        <Link to={'/contents/cvs/GS25'} className='ss-select-list'>
          <div className='ss-list-img-text-box'>
            <div className='ss-list-img-wrapper'>
              <div className='ss-list-img-box'>
                <button className='ss-list-img' id='GS25'></button>
              </div>
            </div>
            <div className='ss-list-text-box'>
              <p className='ss-list-text'>GS25</p>
            </div>
          </div>
        </Link>

        <Link to={'/contents/cvs/CU'} className='ss-select-list'>
          <div className='ss-list-img-text-box'>
            <div className='ss-list-img-wrapper'>
              <div className='ss-list-img-box'>
                <button className='ss-list-img' id='CU'></button>
              </div>
            </div>
            <div className='ss-list-text-box'>
              <p className='ss-list-text'>CU</p>
            </div>
          </div>
        </Link>

        <Link to={'/contents/cvs/7-eleven'} className='ss-select-list' >
          <div className='ss-list-img-text-box'>
            <div className='ss-list-img-wrapper'>
              <div className='ss-list-img-box'>
                <button className='ss-list-img' id='SevenEleven'></button>
              </div>
            </div>
            <div className='ss-list-text-box'>
              <p className='ss-list-text'>7-Eleven</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
    </div>
  </>
  );
};

export default ConnectStoreSales;
