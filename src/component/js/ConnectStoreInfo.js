import React, {useEffect, useState} from 'react';
import '../scss/ConnectStoreInfo.scss';
import {useParams} from "react-router-dom";

const ConnectStoreInfo = () => {
  const [cvsData, setCvsData] = useState([]);
  const [cvsType, setCvsType] = useState('GS25');
  const [cvsSale, setCvsSale] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const { cvsname } = useParams();

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

  useEffect(() => {
    // URL 파라미터를 이용하여 cvsType 상태를 업데이트합니다.
    setCvsType(cvsname);
  }, [cvsname]);

  const handleCvsTypeChange = (selectedCvsType) => {
    setCvsType(selectedCvsType);
  };

  const handleCvsSaleFilter = (selectedCvsSale) => {
    setCvsSale(selectedCvsSale);
  };

  const filterData = () => {
    let filtered = cvsData.filter((item) => item.cvs === cvsType);

    // 편의점 타입 필터링
    // filtered = filtered.filter((item) => item.cvs === cvsType);

    // 세일 필터링
    if (cvsSale) {
      filtered = filtered.filter((item) => item.sale === cvsSale);
    }

    setFilteredData(filtered);
  };


  const Row = ({ item }) => {
    return (
        <div className='store-info-list'>
          <div className={'sale-info-box'}>
            <p>{item.sale}</p>
          </div>
          <div className='list-header'>
            <div className='info-img-box'>
              <div className='info-img'>
                <img src={item.img} alt="상품 이미지" className={'custom-img'}/>
              </div>
            </div>
          </div>
          <div className='list-main'>
            <div className='info-name-box'>
              <p>{item.title}</p>
            </div>
          </div>
          <div className='list-footer'>
            <div className='info-price-box'>
              <p>{item.price}</p>
            </div>
          </div>
        </div>
    );
  };

  return (

      <>
        <div className='store-info-wrapper'>
          <div className='store-info-box'>
            <header className='store-info-header'>
              <div
                  className={`info-view-all ${cvsSale === null ? 'active' : ''}`}
                  onClick={() => handleCvsSaleFilter(null)}
              >
                <p>전체보기</p>
              </div>
              <div
                  className={`one-plus-one ${cvsSale === '1+1' ? 'active' : ''}`}
                  onClick={() => handleCvsSaleFilter('1+1')}
              >
                <p>1 + 1</p>
              </div>
              <div
                  className={`two-plus-one ${cvsSale === '2+1' ? 'active' : ''}`}
                  onClick={() => handleCvsSaleFilter('2+1')}
              >
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
                      <input
                          type='text'
                          className='store-info-input'
                          placeholder='검색어를 입력하세요'
                      />
                      <div className='search-btn-box'>
                        <button className='search-btn'></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='store-info-main-wrapper'>
                  <div className='store-info-main-box'>
                    <div className='store-info-list-box'>
                      {filteredData.map((item, index) => (
                          <Row key={index} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='ss-select-list'>
        </div>
      </>
  );
};

export default ConnectStoreInfo;
