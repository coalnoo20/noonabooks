// * -------------
// * 전역 설정
// * -------------
// todo : 변수 / 상수 네이밍 규칙 필요
// todo : 전역 설정할 변수 목록 작성 필요

// ! API 관련 설정
// todo : 알라딘 API url 키 종류별로 미리 준비

// ? 알라딘 API 원 구조 예시 (itemSearch)
// `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblusci2359001&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`

const urlProxy = 'corsproxy.io/?'; // ! 프록시 서버 주소 (아래 urlAPI 예시와 같이 앞에 붙여 사용)

// ? 알라딘 ItemSearch 주소
// ? 알라딘 상품 검색 - 상세 검색 / 검색 결과 창
const urlAPI_ItemSearch = urlProxy + 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';

// ? 쿼리 영역 - ItemSearch

let ItemSearch_query = 'aladdin';
// 검색어, 기본값 없음 (핈수)

let ItemSearch_queryType = 'Title';
// 기본값은 Keyword
// Title, Author, Publisher

let ItemSearch_searchTarget = 'Book';
// 기본값은 Book
// Foreign, Music, DVD, Used, eBook, All

let ItemSearch_start = 1;
// 검색결과 시작 페이지 - 기본값 1

let ItemSearch_maxResults = 10;
// 검색결과 한 페이지당 최대 출력 개수 - 기본값 10

let ItemSearch_output = 'js';
// 기본값 XML
// JS : JSON 방식

let ItemSearch_version = '20131101';
// 버전정보 - 기본값 20070901
// 최신 버전 20131101

// 미사용 쿼리
// Sort - Accuracy(기본값) : 관련도
// Cover - 커버 이미지 크기 / 기본값 Mid
// CategoryID - 기본값 0 : 전체
// Partner - 파트너 코드
// includeKey - 기본값 0
// inputEncoding - 기본값 utf-8
// outofStockfilter -기본값 :0
// Recent PublishFilter - 기본값 : 0
// OptResult - 부가정보

// ? 알라딘 ItemList 주소
// ? 상품 리스트 API - 추천도서 / 신간 / 베스트 셀러 등
const urlAPI_ItemList = urlProxy + 'http://www.aladin.co.kr/ttb/api/ItemList.aspx';

// ? 쿼리 영역 - ItemList

// QueryType (필수)

// SearchTarget
// SubSearchTarget
// Start
// MaxResults
// Cover
// CategoryId
// Output
// Partner
// includeKey
// InputEncoding
// Version
// outofStockfilter
// Year, Month, Week
// OptResult

// ? 알라딘 ItemLookUp 주소
// ? 상품 조회 API - 상품 상세 정보
const urlAPI_ItemLookUp = urlProxy + 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

// ? 쿼리 영역 - ItemLookUp

// ItemId - 알라딘 고유 상품 번호 (필수)

// ItemIdType - 가급적 13자리 ISBN / 다른 API와 연동시 체크 포인트
// Cover - 커버 이미지 / 기본값 Mid
// Output
// Partner
// Version
// includeKey
// offCode
// OptResult

// ? ttbKey

const ttbKey_ONDAL = `ttblusci2359001`; // ! TTB key - 원종

let urlTest = new URL(`https://${urlAPI_ItemSearch}?ttbkey=${ttbKey_ONDAL}`);

// ! Const - 일반 상수 설정

// ! let - 일반 변수

let bookList = [];

let callback = [];

let data = '';

// * HOME 슬라이드 관련 변수
let slides = document.querySelector('.slides');

let slideItem = document.querySelectorAll('.slides .slide_item');

let currentIdx = 0;

let slideWidth = 260;

let slideMargin = 120;

let prevBtn = document.querySelector('.prev');

let nextBtn = document.querySelector('.next');

// ! html control (object)

// * -------------
// * 함수 영역 -일반
// * -------------

// ! 알라딘 ItemSearch 가져오기

const getList = async () => {
    console.log('get list');

    urlTest.searchParams.set('Query', ItemSearch_query);
    urlTest.searchParams.set('QueryType', ItemSearch_queryType);
    urlTest.searchParams.set('MaxResult', ItemSearch_maxResults);
    urlTest.searchParams.set('start', ItemSearch_start);
    urlTest.searchParams.set('SearchTarget', ItemSearch_searchTarget);
    urlTest.searchParams.set('output', ItemSearch_output);
    urlTest.searchParams.set('Version', ItemSearch_version);

    const response = await fetch(urlTest);

    const data = await response.json();

    console.log('ddd', data);
};

// ! HOME 슬라이드 추천도서 가져오기
const loadSlideBooks = async () => {
    const url = new URL(`https://corsproxy.io/?http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbKey_ONDAL}`);
    url.searchParams.set('QueryType', 'ItemEditorChoice');
    url.searchParams.set('CategoryId', 1); //소설
    url.searchParams.set('MaxResults', 5);
    url.searchParams.set('SearchTarget', 'Book');
    url.searchParams.set('output', 'js');
    url.searchParams.set('Version', 20131101);

    const response = await fetch(url);
    data = await response.json();
    bookList = data.item;

    const slideHTML = bookList
        .map((book) => {
            return `<div class="slide_item">
        <div></div>
        <img
          src="${book.cover}"
        />
      </div>`;
        })
        .join('');

    document.getElementById('main_slide').innerHTML = slideHTML;

    slideClone();
};

// * -------------
// * 함수 영역 - html/css/ui 관련
// * -------------

//! HOME 슬라이드 구현 함수
const slideClone = () => {
    slideItem = document.querySelectorAll('.slides .slide_item');
    for (let i = 0; i < slideItem.length; i++) {
        let cloneSlide = slideItem[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for (let i = slideItem.length - 1; i >= 0; i--) {
        let cloneSlide = slideItem[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }

    updateWidth();
    setInitialPosition();
    setTimeout(function () {
        slides.classList.add('animated');
    }, 100);
};

const updateWidth = () => {
    let currentSlides = document.querySelectorAll('.slides .slide_item');
    let newSlideCount = currentSlides.length;

    let newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWidth;
};

//초기 위치 세팅
const setInitialPosition = () => {
    let initialTranslateValue = -((slideWidth + slideMargin) * slideItem.length);
    slides.style.transform = `translateX(${initialTranslateValue}px)`;
};

//슬라이드 움직이는 함수
const moveSlide = (num) => {
    slides.style.left = -num * (slideWidth + slideMargin) + 'px';
    currentIdx = num;
    console.log(currentIdx, slideItem.length);
    if (currentIdx === slideItem.length || currentIdx === -slideItem.length) {
        setTimeout(function () {
            slides.classList.remove('animated');
            slides.style.left = '0px';
            currentIdx = 0;
        }, 500);
        setTimeout(function () {
            slides.classList.add('animated');
        }, 600);
    }
};

prevBtn.addEventListener('click', () => moveSlide(currentIdx - 1));
nextBtn.addEventListener('click', () => moveSlide(currentIdx + 1));

// * -------------
// * 테스트 코드 영역
// * -------------
// todo : CORS 에러 관련 코드는 금요일 오후 8시 회의 전 삭제 예정 - ONDAL

// ! JSONP 테스트

const testJSONP = () => {
    //         $.ajax({
    //         url: url,
    //         dataType: 'jsonp',
    //         jsonpCallback: "myCallback",
    //         success: callback
    //       });

    //       console.log(myCallback);

    $.getJSON(urlTest + '?callback=?', data, callback);
};

//       $.getJSON(url + "?callback=?", data, callback);

const testScript = () => {
    var script = document.createElement('script');
    script.src = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblusci2359001&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

    document.getElementsByTagName('head')[0].appendChild(script);

    function myCallback(data) {
        //callback method
    }
};

const getRandomBooks = () => {
    console.log('function getRandomBooks called');
};

const getRandomOneBook = () => {
    console.log('function getRandomOneBook called');
};

const getListByKeyword = () => {
    console.log('function getListByKeyword called');
};

// * -------------
// * 실행 영역
// * -------------
// ! 페이지 로드 후 실행이 필요한 기능

loadSlideBooks();
console.log('start-update');
