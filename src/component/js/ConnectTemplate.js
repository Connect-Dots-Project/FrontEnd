import React from 'react'
import ConnectHeader from './ConnectHeader';
import MenuRouter from '../../route/MenuRouter';

import '../scss/ConnectTemplate.scss';

const ConnectTemplate = () => {
  return (
    <div className='ConnectTemplate'>
        <ConnectHeader/>
        <MenuRouter />
    </div>
  )
}

export default ConnectTemplate