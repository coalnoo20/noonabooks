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
let ItemLookUp_ItemIdType = 'ISBN13';
// ItemIdType - 가급적 13자리 ISBN / 다른 API와 연동시 체크 포인트

let ItemLookUp_ItemId = 9788958285342;
// ItemId - 알라딘 고유 상품 번호 (필수)

let ItemLookUp_Output = 'js';
// Output

let ItemLookUp_Version = '20131101';
// Version

// OptResult
// Cover - 커버 이미지 / 기본값 Mid
// Partner
// includeKey
// offCode

// ? ttbKey

const ttbKey_ONDAL = `ttblusci2359001`; // ! TTB key - 원종
const ttbKey_LUNA = `ttblhyasd2323001`; // ! TTB key - 혜영
const ttbKey_JIHYEON = 'ttbrlawlgus09150054001'; // ! TTB key - 지현
const ttbKey_HY = `ttbgkdud98702321001`; // ! TTB key - 하영

let urlTest = new URL(`https://${urlAPI_ItemSearch}?ttbkey=${ttbKey_ONDAL}`);

// ! Const - 일반 상수 설정

// ! let - 일반 변수

let bookList = [];

let callback = [];

let data = '';

// ! html control (object)

// * HOME 슬라이드 관련 변수
let slides = document.querySelector('.slides');

let slideItem = document.querySelectorAll('.slides .slide_item');

let currentIdx = 0;

let slideWidth = 260;

let slideMargin = 150;

let prevBtn = document.querySelector('.prev');

let nextBtn = document.querySelector('.next');

const pathNow = window.location.pathname; // ! 현재 윈도우의 경로 체크용

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

// ! 알라딘 ItemLookUp 가져오기
const getItemDetails = async () => {
    let urlDetail = new URL(`https://${urlAPI_ItemLookUp}?ttbkey=${ttbKey_LUNA}`);
    console.log('get item details');

    urlDetail.searchParams.set('ItemIdType', ItemLookUp_ItemIdType);
    urlDetail.searchParams.set('ItemId', ItemLookUp_ItemId);
    urlDetail.searchParams.set('Output', ItemSearch_output);
    urlDetail.searchParams.set('Version', ItemLookUp_Version);

    try {
        const response = await fetch(urlDetail);
        const data = await response.json();
        // console.log(data.item[0]);
        displayResults(data.item[0]);
    } catch (error) {
        console.error('Error:', error);
    }
};

const displayResults = (results) => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // 이전 결과 초기화

    const singleBookElement = createBookElement(results);
    resultsContainer.appendChild(singleBookElement);
};

const createBookElement = (bookInfo) => {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `<h2>제목: ${bookInfo.title}</h2>
        <h3>작가: ${bookInfo.author}</h3>
        <p>${bookInfo.description.length > 150 ? bookInfo.description.slice(0, 150) : bookInfo.description}...</p>
        <p>도서 출판날짜: ${bookInfo.pubDate}</p>
        <p>ISBN: ${bookInfo.isbn}</p>
        <p>판매 가격: ${bookInfo.priceStandard.toLocaleString('en-US', {
            currency: 'KRW',
        })}원</p>
        <p>할인 가격: ${bookInfo.priceSales.toLocaleString('en-US', {
            currency: 'KRW',
        })}원</p>
        <img src="${bookInfo.cover}" alt="cover"><br>
        <hr>`;
    return bookElement;
};

// ! 리뷰 작성 CRUD
let reviews = [
    { id: 1, text: 'Great product!', rating: 5 },
    { id: 2, text: 'Could be better', rating: 3 },
];

let editingReviewId = null;

const renderReviews = () => {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviews.forEach((review) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>평점:</strong> ${review.rating}, <span>${review.text}</span> 
                      <button onclick="editReview(${review.id})">수정</button>
                      <button onclick="deleteReview(${review.id})">삭제</button>`;
        reviewList.appendChild(li);
    });
};

const submitReview = () => {
    const textInput = document.getElementById('review-text');
    const ratingInput = document.getElementById('review-rating');

    const text = textInput.value;
    const rating = parseInt(ratingInput.value, 10);

    if (text && !isNaN(rating) && rating >= 1 && rating <= 10) {
        if (editingReviewId !== null) {
            // 리뷰 편집
            const index = reviews.findIndex((review) => review.id === editingReviewId);

            if (index !== -1) {
                reviews[index].text = text;
                reviews[index].rating = rating;
                editingReviewId = null;
            }
        } else {
            // 리뷰 추가
            const newReview = {
                id: reviews.length + 1,
                text: text,
                rating: rating,
            };
            reviews.push(newReview);
        }

        // 폼 비우기
        textInput.value = '';
        ratingInput.value = '';

        renderReviews();
    } else {
        alert('유효하지 않은 입력입니다. 유효한 리뷰 텍스트와 평가를 입력해주세요.');
    }
};

const editReview = (id) => {
    const reviewToEdit = reviews.find((review) => review.id === id);

    if (reviewToEdit) {
        const textInput = document.getElementById('review-text');
        const ratingInput = document.getElementById('review-rating');

        textInput.value = reviewToEdit.text;
        ratingInput.value = reviewToEdit.rating;

        editingReviewId = id;
    }
};

const deleteReview = (id) => {
    const confirmDelete = confirm('이 리뷰를 삭제하시겠습니까?');

    if (confirmDelete) {
        reviews = reviews.filter((review) => review.id !== id);
        renderReviews();
    }
};

const cancelEdit = () => {
    editingReviewId = null;

    // 폼 비우기
    document.getElementById('review-text').value = '';
    document.getElementById('review-rating').value = '';
};

// ! HOME 빠른 검색
const easySearchBooks = async () => {
    const easyKeyword = document.getElementById('easy_keyword').value;

    const urlEasySearch = new URL(`https://${urlAPI_ItemList}?ttbkey=${ttbKey_HY}`);
    urlSlide.searchParams.set('Query', easyKeyword);
    urlSlide.searchParams.set('QueryType', 'Keyword');
    urlSlide.searchParams.set('SearchTarget', 'Book');
    urlSlide.searchParams.set('output', 'js');
    urlSlide.searchParams.set('Version', 20131101);
    urlSlide.searchParams.set('Cover', 'Big');

    const response = await fetch(urlSlide);
    data = await response.json();
    bookList = data.item;

    console.log(bookList);
};

// ! HOME 슬라이드 추천도서 가져오기
const loadSlideBooks = async () => {
    const urlSlide = new URL(`https://${urlAPI_ItemList}?ttbkey=${ttbKey_HY}`);
    urlSlide.searchParams.set('QueryType', 'ItemEditorChoice');
    urlSlide.searchParams.set('CategoryId', 1); //소설
    urlSlide.searchParams.set('MaxResults', 10);
    urlSlide.searchParams.set('SearchTarget', 'Book');
    urlSlide.searchParams.set('output', 'js');
    urlSlide.searchParams.set('Version', 20131101);
    urlSlide.searchParams.set('Cover', 'Big');

    const response = await fetch(urlSlide);
    data = await response.json();
    bookList = data.item;

    // todo : 링크는 추후 상세페이지 링크로 수정할 예정(현재 알라딘 링크로 연결됨)
    const slideHTML = bookList
        .map((book) => {
            return `<div class="slide_item">
            <a href="${book.link}">
        <div class="slide_contents">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
        </div>
        <img
          src="${book.cover}"
        /></a>
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

// ? addEventListener를 함수로 감싸 특정 페이지에서만 호출하여 사용 (최하단 확인)
// ! 페이지 이동시 해당 요소를 찾지 못한 addEventListner로 인해 에러 출력되는 문제 해결용

const slideControlSetup = () => {
    prevBtn.addEventListener('click', () => moveSlide(currentIdx - 1));
    nextBtn.addEventListener('click', () => moveSlide(currentIdx + 1));
};

// ! 구매 페이지 (상세 페이지쪽과 상의 필요)
// 알라딘 API에서 받아올 상품 번호 임시 데이터
const itemIsbn = 'K222938801';

fetch(`https://corsproxy.io/?http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbKey_JIHYEON}&itemIdType=ISBN&ItemId=${itemIsbn}&output=js&Version=20131101`)
    .then((response) => response.json())
    .then((data) => {
        // 'item' 키가 있는지 확인
        if (data.item && Array.isArray(data.item) && data.item.length > 0) {
            const itemInfo = data.item[0];
            const bookTitle = itemInfo.title;
            const author = itemInfo.author;
            const publisher = itemInfo.publisher;
            const price = itemInfo.priceStandard;
            const coverUrl = itemInfo.cover;

            // HTML에 업데이트
            document.getElementById('book-title').innerText = bookTitle;
            document.getElementById('author').innerText = author;
            document.getElementById('publisher').innerText = publisher;
            document.getElementById('price').innerText = price;
            document.getElementById('book-cover').src = coverUrl;
        } else {
            console.error('No item found in response:', data);
        }
    })
    .catch((error) => console.error('Error:', error));

document.getElementById('confirm-purchase').addEventListener('click', function () {
    alert('바로 구매가 완료되었습니다!');
    window.location = '../index.html';
});

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

if (pathNow === '/index.html' || pathNow === '/') {
    slideControlSetup();
    loadSlideBooks();
} else if (pathNow === '/html/item_detail.html') {
    renderReviews(); // 리뷰 렌더링
} else if (pathNow === '/html/search_result.html') {
    console.log(pathNow);
} else if (pathNow === '/html/purchase.html') {
    console.log(pathNow);
} else if (pathNow === '/html/info_shop.html') {
    console.log(pathNow);

    // ! google map api

    const mapElement = document.getElementById('map');

    const map = new google.maps.Map(mapElement, {
        center: { lat: 37.65816, lng: 126.7635 },
        zoom: 15,
    });

    const marker = new google.maps.Marker({
        position: { lat: 37.65816, lng: 126.7635 },
        map: map,
        title: 'Team20 위치',
    });
} else {
    console.log('해당 페이지에 대한 렌더링 함수가 없습니다.');
}

console.log('start-update');
