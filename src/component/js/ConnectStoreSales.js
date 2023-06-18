import React, { useState } from 'react'

import '../scss/ConnectStoreSales.scss';

const ConnectStoreSales = ({ closeChangeMenu }) => {

  const [isOpenStoreMenu, setIsOpenStoreMenu] = useState(true);

  const openChangeMenu = e => {

    const $aaa = document.getElementById('AA');
    $aaa.style.background = 'black';
    
    setIsOpenStoreMenu(false);
  };


  return (
    <>

    {closeChangeMenu && (
      <button id='AA' onClick={ openChangeMenu }>ConnectStoreSales</button>
    )}



    
    </>
  )
}

export default ConnectStoreSales