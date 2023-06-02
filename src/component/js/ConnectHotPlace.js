import React from 'react'

import '../scss/ConnectHotPlace.scss';
import { Link } from 'react-router-dom';

const ConnectHotPlace = () => {
  return (
    <>
      {/* hp-wrapper */}
      <div className='hp-wrapper'>
        {/* hp-wrapper box */}
        <div className='hp-info-box'>

          {/* hot-place 정보 */}
          <div className='hp-info'>
              <div className='hp-info-img-text-box'>
                <Link to='/' className='hp-info-img-box'>
                  <div className='info-img'></div>
                </Link>
                <div className='hp-text-box'>
                  <div className='hp-text'>
                    <p>강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남강남</p>
                  </div>
                  <div className='like-box'>
                    <p className='like-count'>1</p>
                    <button className='like' id='Like'></button>
                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>






    </>
  )
}

export default ConnectHotPlace