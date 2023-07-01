import React, {useEffect, useState, useRef } from 'react';
import '../scss/ConnectStoreInfo.scss';

import {useParams, useNavigate } from "react-router-dom";
import ConnectLogin from "./ConnectLogin";
import {getLoginUserInfo} from "../../util/login-util";

import { API_BASE_URL } from '../../config/host-config';
import swal from 'sweetalert';


const ConnectStoreInfo = () => {
  const [cvsData, setCvsData] = useState([]);
  const [cvsType, setCvsType] = useState('GS25');
  const [cvsSale, setCvsSale] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const {cvsname} = useParams();
  const storeInfoListRef = useRef(null);
  // const [loginModalVisible, setLoginModalVisible] = useState(false);


  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터를 불러옵니다.
    getCvsData();
  }, []);

  useEffect(() => {
    // cvsData가 변경되거나 cvsType, cvsSale이 변경될 때마다 필터링을 수행합니다.
    filterData();
  }, [cvsData, cvsType, cvsSale]);


  const handleAlertConfirm = () => {
    // "/" 경로로 리다이렉트합니다.
    if(window.location.href !== '/') {
      navigate('/');
      // setLoginModalVisible(true);
    }
  };


  const getCvsData = () => {
    // const MyToken = localStorage.getItem("Authorization");

    // 서버로부터 데이터를 가져오는 비동기 함수를 호출합니다.

    fetch(API_BASE_URL + '/contents/cvs', {
      method: "GET",
      headers: {
        'Authorization':  getLoginUserInfo().token
      },
      credentials: 'include'
    })
        .then((response) => {
          if(response.status===401){
          swal('알림','로그인한 회원만 이용하실 수 있습니다','warning');
          handleAlertConfirm();
        } return response.json()})

        .then((data) => {
          setCvsData(data);
          // console.log('데이터 전송 완료');
        })
        .catch((error) => {
          console.error('Error fetching CVS data:', error);
        });
  };

  useEffect(() => {
    // URL 파라미터를 이용하여 cvsType 상태를 업데이트합니다.
    setCvsType(cvsname);
  }, [cvsname]);

  // const handleCvsTypeChange = (selectedCvsType) => {
  //   setCvsType(selectedCvsType);
  // };


  const handleCvsSaleFilter = (selectedCvsSale) => {
    setCvsSale(selectedCvsSale);
    storeInfoListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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



  const Row = ({item}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(true);

    const handleImageError = () => {
      setIsImageLoaded(false);
    }

    return (
        <div className='store-info-list' >
          <div className={`sale-info-box ${item.sale === '1+1' ? 'oneplus' : 'twoplus'}`}>
            <p>{item.sale}</p>
          </div>
          <div className='list-header'>
            <div className='info-img-box'>
              {isImageLoaded ? (
                  <div className='info-img'>
                    <img src={item.img} alt='상품 이미지' className='custom-img' onError={handleImageError} />
                  </div>
              ) :  <div className='info-img'>
                <img alt='' />
              </div>}
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
  const sortByPrice = () => {
    const sortedData = [...filteredData];

    // 가격 비교 함수
    const comparePrice = (a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

      return priceA - priceB;
    };

    // 가격 비교 후 정렬
    sortedData.sort(comparePrice);

    setFilteredData(sortedData);
  };
  const sortByPriceDesc = () => {
    const sortedData = [...filteredData];

    // 가격 비교 함수
    const comparePrice = (a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

      return priceB - priceA;
    };

    // 가격 비교 후 정렬
    sortedData.sort(comparePrice);

    setFilteredData(sortedData);
  };

  const sortByName = () => {
    const sortedData = [...filteredData];

    // 이름 비교 함수
    const compareName = (a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();

      // 한글과 숫자가 혼합된 문자열 비교
      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      return collator.compare(nameA, nameB);
    };

    // 이름 비교 후 정렬
    sortedData.sort(compareName);

    setFilteredData(sortedData);
  };
  const handleSearch = () => {

    // 검색어와 상품 데이터를 비교하여 일치하는 항목들만 필터링
    const filtered = cvsData.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
      <>
        <div className='store-info-wrapper'>
          <div className='store-info-box'>
            <header className='store-info-header'>
              <div
                  className={`info-view-all ${cvsSale === null ? 'active' : ''} `}
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
                    <button className='price-btn' onClick={sortByPrice} >
                      <p>낮은 가격순</p>
                    </button>
                    <button className='price-btn' onClick={sortByPriceDesc}>
                      <p>높은 가격순</p>
                    </button>
                    <button className='price-btn' onClick={sortByName}>
                      <p>이름순</p>
                    </button>
                  </div>
                  <div className='search-box'>
                    <div className='input-btn-box'>
                      <input
                          type='text'
                          className='store-info-input'
                          placeholder='검색어를 입력하세요'
                          value={searchText}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                      />
                      <div className='search-btn-box'>
                        <button className='search-btn' onClick={handleSearch}></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='store-info-main-wrapper'>
                  <div className='store-info-main-box'>
                    <div className='store-info-list-box'  ref={storeInfoListRef}>
                      {filteredData.length > 0 ? (
                          <div className='store-info-list-box' ref={storeInfoListRef}>
                            {filteredData.map((item, index) => (
                                <Row key={index} item={item} />
                            ))}
                          </div>
                      ) : (
                          <div className='no-products-message'>
                            <p>상품이 없습니다</p>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='ss-select-list'>
        </div>
        {/*{<ConnectLogin loginModalVisible={loginModalVisible}/>}*/}
        { <ConnectLogin />}
        {/*{ loginModalVisible && <ConnectLogin loginModalVisible={loginModalVisible} />}*/}
      </>
  );
}
  export default ConnectStoreInfo;