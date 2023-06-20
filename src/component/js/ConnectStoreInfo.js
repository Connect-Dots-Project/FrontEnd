import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

import '../scss/ConnectStoreInfo.scss';

const ConnectStoreInfo = () => {
  const [cvsData, setCvsData] = useState([]);
  const [cvsType, setCvsType] = useState('GS25');
  const [cvsSale, setCvsSale] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터를 불러옵니다.
    getCvsData();
  }, []);

  useEffect(() => {
    // cvsData가 변경되거나 cvsType, cvsSale이 변경될 때마다 필터링을 수행합니다.
    filterData();
  }, [cvsData, cvsType, cvsSale]);

  const getCvsData = () => {
    // 서버로부터 데이터를 가져오는 비동기 함수를 호출합니다.
    fetch('http://localhost:8181/contents/cvs')
      .then((response) => response.json())
      .then((data) => {
        setCvsData(data);
        console.log('데이터 전송 완료');
      })
      .catch((error) => {
        console.error('Error fetching CVS data:', error);
      });
  };

  const handleCvsTypeChange = (selectedCvsType) => {
    setCvsType(selectedCvsType);
  };

  

  const handleCvsSaleFilter = (selectedCvsSale) => {
    setCvsSale(selectedCvsSale);
  };

  const filterData = () => {
    let filtered = cvsData;

    // 편의점 타입 필터링
    filtered = filtered.filter((item) => item.cvs === cvsType);

    // 세일 필터링
    if (cvsSale) {
      filtered = filtered.filter((item) => item.sale === cvsSale);
    }

    setFilteredData(filtered);
  };

  const Row = ({ index, style }) => {
    const item = filteredData[index];
    return (
      <div style={style}>
        <img src={item.img} alt="이미지"/>
        <li key={index}>{item.title} {item.price} {item.sale} {item.cvs}</li>
      </div>
      
    );
  };

  return (
    <>
      <div className='store-info-wrapper'>
        <div className='store-info-box'>

          <header className='store-info-header'>
            <div className='info-view-all'>
              <p>전체보기</p>
            </div>
            <div className='one-plus-one'>
              <p>1 + 1</p>
            </div>
            <div className='two-plus-one'>
              <p>2 + 1</p>
            </div>
          </header>

          <div className='store-info-filter-wrapper'>
            <div className='store-info-filter-box'>
              <div className='store-info-filter'>
                <div className='price-btn-box'>
                  <button className='price-btn'>
                    <p>가격순</p>
                  </button>
                  <button className='price-btn'>
                    <p>임시</p>
                  </button>
                </div>

                <div className='search-box'>
                  <div className='input-btn-box'>
                    <input type='text' className='store-info-input' placeholder='검색어를 입력하세요'/>
                    <div className='search-btn-box'>
                      <button className='search-btn'></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='store-info-main-wrapper'>
                <div className='store-info-main-box'>
                  <div className='store-info-list-box'>
                    {filteredData.length > 0 ? ( // filteredData가 비어 있지 않을 경우에만 List 컴포넌트 렌더링
                        <List
                          height={1000}
                          itemCount={filteredData.length}
                          itemSize={100}
                          width={'100%'}
                        >
                          {Row}
                        </List>
                      ) : (
                        <p>No data found.</p> // filteredData가 비어 있을 경우에는 메시지 표시
                      )}
                    <div className='store-info-list'>
                        <div className='list-header'>
                        <div className='info-img-box'>
                          <div className='info-img'></div>
                        </div>
                      </div>

                      <div className='list-main'>
                        <div className='info-name-box'>
                          <p>초코파이</p>
                        </div>
                      </div>

                      <div className='list-footer'>
                        <div className='info-price-box'>
                          <p>6,000원</p>
                        </div>
                      </div>
                    </div>

                   

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectStoreInfo;
