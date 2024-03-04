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

// ? 알라딘 ItemOffStoreList 주소
// ? 중고상품 보유 매장 검색 API
const urlAPI_ItemOffStoreList = urlProxy + 'http://www.aladin.co.kr/ttb/api/ItemOffStoreList.aspx';

// ? 쿼리 영역 - ItemLookUp
let ItemOffStoreList_ItemType = 'ISBN13';

let ItemOffStoreList_ItemId = 9788958285342;

let ItemOffStoreList_Output = 'js';

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

let testISBN13 = 999;

let testStorageRequest = {
    type: 'ISBN13',
    ISBN13: 9788915107243,
    ID: 228971437,
};

// ! html control (object)

// ? HOME 슬라이드 관련 변수
let slides = document.querySelector('.slides');

let slideItem = document.querySelectorAll('.slides .slide_item');

let currentIdx = 0;

let slideWidth = 260;

let slideMargin = 150;

let prevBtn = document.querySelector('.prev');

let nextBtn = document.querySelector('.next');

// ? 현재 윈도우의 경로 체크용
const pathNow = window.location.pathname;

// ? 에디터 추천 페이지의 이미지 링크 버튼
const linkOutEditor = document.getElementById('linkOutEditor');
const btnItemDetail = document.getElementById('btnItemDetail');

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
const getItemDetails = async (isbn13 = ItemLookUp_ItemId) => {
    let urlDetail = new URL(`https://${urlAPI_ItemLookUp}?ttbkey=${ttbKey_LUNA}`);
    console.log('get item details');

    console.log('getItemDetails - isbn13', isbn13);

    let ItemLookUp_ItemId = isbn13;

    urlDetail.searchParams.set('ItemIdType', ItemLookUp_ItemIdType);
    urlDetail.searchParams.set('ItemId', ItemLookUp_ItemId);
    urlDetail.searchParams.set('Output', ItemSearch_output);
    urlDetail.searchParams.set('Version', ItemLookUp_Version);
    urlDetail.searchParams.set('Cover', 'Big');

    try {
        const response = await fetch(urlDetail);
        const data = await response.json();
        displayResults(data.item[0]);
    } catch (error) {
        console.error('Error:', error);
    }

    getItemOffStoreList();
};

const displayResults = (results) => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // 이전 결과 초기화

    const singleBookElement = createBookElement(results);
    resultsContainer.appendChild(singleBookElement);
};

const createBookElement = (bookInfo) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('item-detail'); // 클래스 추가

    bookElement.innerHTML = `
        <div class="item-detail-img">
            <img src="${bookInfo.cover}" alt="cover">
        </div>
        <div class="item-detail-align">
        <div class="item-detail-info">
            <h2>${bookInfo.title}</h2>
            <h3>${bookInfo.author}</h3>
            <div class="detail_desc">${bookInfo.description.length > 500 ? bookInfo.description.slice(0, 500) : bookInfo.description}</div>
            <br>
            <p>도서 출판날짜: ${bookInfo.pubDate}</p>
            <p>ISBN: ${bookInfo.isbn}</p>
            <p class="text_red text_cancel">판매 가격: ${bookInfo.priceStandard.toLocaleString('en-US', {
                currency: 'KRW',
            })}원</p>
            <p>할인 가격: ${bookInfo.priceSales.toLocaleString('en-US', {
                currency: 'KRW',
            })}원</p>
        </div>
        <div class="buy-button">
        <!-- 구매 페이지로 ISBN을 파라미터로 전달 -->
        <a href="purchase.html?isbn13=${bookInfo.isbn}" class="button btn_red">즉시구매</a>
        </div>
        </div>
        `;

    return bookElement;
};

// ! 알라딘 ItemOffStoreList 가져오기
const getItemOffStoreList = async (isbn13 = ItemOffStoreList_ItemId) => {
    let urlOffStoreList = new URL(`https://${urlAPI_ItemOffStoreList}?ttbkey=${ttbKey_LUNA}`);
    console.log('get item off store list');

    let ItemOffStoreList_ItemId = isbn13;

    urlOffStoreList.searchParams.set('ItemIdType', ItemOffStoreList_ItemType);
    urlOffStoreList.searchParams.set('ItemId', ItemOffStoreList_ItemId);
    urlOffStoreList.searchParams.set('Output', ItemOffStoreList_Output);

    try {
        const response = await fetch(urlOffStoreList);
        const data = await response.json();
        renderStoreList(data.itemOffStoreList);
    } catch (error) {
        console.error('Error:', error);
    }
};

const renderStoreList = (storeList) => {
    console.log(storeList);
    // const storeListHtml = storeList
    //     .map(
    //         (store) => `
    //         <p>${store.offName}</p>
    //         <button><a href="${store.link}" target="_blank">바로가기</a></button>
    //     `
    //     )
    //     .join('');

    // document.getElementById('offstore-list').innerHTML = storeListHtml;
};

// ! 리뷰 작성 CRUD
let reviews = [
    {
        id: 1,
        text: '책은 재미가 없으면 읽는게 고문입니다. 아무리 좋은 책도 재미가 있어야 공부도 되고 교훈도 되는데,재미+감동+띄어쓰기 공부 모두를 만족합니다.아이디어도 뛰어나고(작가님 천재인듯) 감동받아서 눈물날 뻔. 아이에게 읽혀 주면서 둘 다 감동 받았어요. 그리고 너무 재미 있어요!!! 같은 시리즈 "받침구조대"도 바로 사러 갑니다. 그리고 소장가치가 있어 주위에 널리 널리 알리고 싶어지네요. 근데 아이가 또 보자고 하넵요 ㅠㅠ',
        rating: 5,
    },
    { id: 2, text: '아이 키우는 엄마들은 꼭 샀으면 하는 책이에요 띄어쓰기를 어쩜 이렇게 재치있게 풀어냈는지.. 아이가 너무 재밌어하네요. 추천합니다^^ ', rating: 3 },
];

let editingReviewId = null;

const renderReviews = () => {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviews.forEach((review) => {
        const li = document.createElement('li');
        li.classList.add('review-item');
        li.innerHTML = `<div class="review-content"><div class="review-info"><strong>평점:</strong> ${'⭐'.repeat(review.rating)}</div>
                        <div><span>${review.text}</span></div></div> 
                        <div class="review-button"><button onclick="editReview(${review.id})" class="button">수정</button>
                        <button onclick="deleteReview(${review.id})" class="button">삭제</button></div>`;
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

    const urlEasySearch = new URL(`https://${urlAPI_ItemSearch}?ttbkey=${ttbKey_HY}`);
    urlEasySearch.searchParams.set('Query', easyKeyword);
    urlEasySearch.searchParams.set('QueryType', 'Keyword');
    urlEasySearch.searchParams.set('SearchTarget', 'Book');
    urlEasySearch.searchParams.set('output', 'js');
    urlEasySearch.searchParams.set('Version', 20131101);
    urlEasySearch.searchParams.set('Cover', 'Big');

    const response = await fetch(urlEasySearch);
    data = await response.json();
    bookList = data.item;

    // console.log(data);
    location.href = data.link; // todo : 링크는 추후 상세 검색 리스트 페이지로 수정할 예정
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
            // console.log(book.isbn13);
            return `<div class="slide_item">
            <a href="html/item_detail.html?isbn13=${book.isbn13}">
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

// ? 링크 아웃 관련 실행 함수
const linkOutDirectSetup = () => {
    btnItemDetail.addEventListener('click', () => {
        storageTossData();
        linkOut();
    });
};

// ?
const linkOutEditorSetup = () => {
    linkOutEditor.addEventListener('click', () => {
        // console.log(testStorageRequest);
        // console.log(testStorageRequest.ISBN13);
        // storageTossData(); // ! 정보없이 새로운 페이지를 호출하기만 하는 경우
        storageTossData(9791197956850);
        linkOut('/html/item_detail.html?isbn13=9791197956850');
        // linkOut('/html/item_detail.html'); // ! 상세 페이지가 많이 쓰이므로 기본 매개변수로 설정함
        // linkOut('/html/purchase.html'); // ! 구매페이지 연결시 테스트용
        // window.location.href = 'html/item_detail.html'; //! 직접 보내는 대신 linkOut 함수 이용
    });
};

// ? 원하는 주소로 linkOut 하기 위한 함수. 기본 주소는 상세 페이지

const linkOut = (href = '/html/item_detail.html') => {
    window.location.href = href;
};

// ? localStorage에 ISBN이나 ID값을 저장하는 함수

const storageTossData = (tossData, tossType = 'ISBN13') => {
    console.log('tossdata in storageTossData', tossData);
    if (tossData) {
        testStorageRequest.type = tossType;
        if ((tossType = 'ISBN13')) {
            testStorageRequest.ISBN13 = tossData;
        } else if ((tossType = 'ID')) {
            testStorageRequest.ID = tossData;
        } else {
            console.log('타입에러');
            testStorageRequest.ISBN13 = 9788993335231;
        }
    } else {
        console.log('저장할 tossData가 없습니다. 기존 저장된 내용을 초기화 합니다. - 무소유');
        testStorageRequest.type = tossType;
        testStorageRequest.ISBN13 = 9788993335231;
        testStorageRequest.ID = 6740786;
        console.log(testStorageRequest);
    }

    // console.log('sss', testStorageRequest);
    const testObjString = JSON.stringify(testStorageRequest);
    window.localStorage.setItem('testData', testObjString);
    // console.log('testData 로컬저장 완료');
};

// ? localStorage에 저장된 tossData를 불러와서 반환하는 함수

const unpackTossData = () => {
    const tempTestData = window.localStorage.getItem('testData');
    const tempTestObj = JSON.parse(tempTestData);
    // console.log('testData 불러오기 완료', tempTestObj);
    // console.log('testData 불러오기 완료222', tempTestObj.ISBN13);
    return tempTestObj.ISBN13;
};

const loadNewBooks = async () => {
    const urlNewBook = new URL(`https://${urlAPI_ItemList}?ttbkey=${ttbKey_HY}`);
    urlNewBook.searchParams.set('QueryType', 'ItemNewSpecial');
    urlNewBook.searchParams.set('CategoryId', 55889); //소설
    urlNewBook.searchParams.set('MaxResults', 5);
    urlNewBook.searchParams.set('SearchTarget', 'Book');
    urlNewBook.searchParams.set('output', 'js');
    urlNewBook.searchParams.set('Version', 20131101);
    urlNewBook.searchParams.set('Cover', 'Big');

    const response = await fetch(urlNewBook);
    data = await response.json();
    bookList = data.item;

    const slideHTML = bookList
        .map((book) => {
            return `<div class="new_item">
            <a href="html/item_detail.html?isbn13=${book.isbn13}">
        <div class="new_contents">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
        </div>
        <img
          src="${book.cover}"
        /></a>
      </div>`;
        })
        .join('');

    document.getElementById('new_area').innerHTML = slideHTML;
};

// ! 구매 페이지

const purchase = () => {
    // 이제 URL에서 ISBN을 가져옴
    const itemIsbn = urlPharsing();

    fetch(`https://corsproxy.io/?http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbKey_JIHYEON}&itemIdType=ISBN&ItemId=${itemIsbn}&output=js&Version=20131101&cover=Big`)
        .then((response) => response.json())
        .then((data) => {
            // 'item' 키가 있는지 확인
            if (data.item && Array.isArray(data.item) && data.item.length > 0) {
                const itemInfo = data.item[0];
                const bookTitle = itemInfo.title;
                const author = itemInfo.author;
                const publisher = itemInfo.publisher;
                const coverUrl = itemInfo.cover;
                const price = itemInfo.priceSales;

                const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

                // HTML에 업데이트
                document.getElementById('book-title').innerText = bookTitle;
                document.getElementById('author').innerText = author;
                document.getElementById('publisher').innerText = publisher;
                document.getElementById('price').innerText = formattedPrice + '원';
                document.getElementById('book-cover').src = coverUrl;
            } else {
                console.error('No item found in response:', data);
            }
        })
        .catch((error) => console.error('Error:', error));

    document.getElementById('confirm-purchase').addEventListener('click', function () {
        // 랜덤 주문번호 생성
        const orderNumber = Math.floor(Math.random() * 1000000);
        alert('구매가 완료되었습니다!');
        // 주문 완료
        document.getElementById('resultArea').innerHTML = `
                <p style="color:green;">고객님의 주문이 성공적으로 완료되었습니다.</p>
                <p><strong>주문 번호: ${orderNumber}</strong></p>
            `;
    });
};

// * url의 isbn정보 Pharsing 용 함수

const urlPharsing = () => {
    const urlParams = new URL(location.href).searchParams;
    const isbn13 = urlParams.get('isbn13');
    console.log('is', isbn13);
    return isbn13;
};

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
    // linkOutDirectSetup();
    linkOutEditorSetup();
    loadSlideBooks();
    loadNewBooks();
} else if (pathNow === '/html/item_detail.html') {
    console.log('테스트url', urlPharsing());
    console.log('check-default-testISBN13', testISBN13);
    if (urlPharsing()) {
        testISBN13 = urlPharsing();
    } else {
        testISBN13 = unpackTossData();
    }
    console.log('after-ISBN13', testISBN13);
    getItemDetails(testISBN13);
    renderReviews(); // 리뷰 렌더링
} else if (pathNow === '/html/search_result.html') {
    console.log(pathNow);
} else if (pathNow === '/html/purchase.html') {
    console.log(pathNow);
    console.log('테스트url', urlPharsing());
    console.log('check-default-testISBN13', testISBN13);
    if (urlPharsing()) {
        testISBN13 = urlPharsing();
    } else {
        testISBN13 = unpackTossData();
    }
    console.log('after-ISBN13', testISBN13);
    purchase();
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
