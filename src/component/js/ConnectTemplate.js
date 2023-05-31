import React from 'react'

import '../scss/ConnectTemplate.scss';
import ConnectHeader from './ConnectHeader';
import ConnectMain from './ConnectMain';

const ConnectTemplate = () => {
  return (
    <div className='ConnectTemplate'>
        <ConnectHeader />
        <ConnectMain />
    </div>
  )
}

export default ConnectTemplate