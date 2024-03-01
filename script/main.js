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

const urlAPI = urlProxy + 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx'; // ! 알라딘 ItemSearch 주소

const ttbKey = `ttblusci2359001`; // ! TTB key - 원종

let url = new URL(`https://${urlAPI}?ttbkey=${ttbKey}`);

// ! 쿼리 영역

let query = 'aladdin';

let queryType = 'Title';

let maxResults = 10;

let resultStart = 1;

let SearchTarget = 'Book';

let outputStyle = 'js';

let apiVersion = '20131101';

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

    url.searchParams.set('Query', query);
    url.searchParams.set('QueryType', queryType);
    url.searchParams.set('MaxResult', maxResults);
    url.searchParams.set('start', resultStart);
    url.searchParams.set('SearchTarget', SearchTarget);
    url.searchParams.set('output', outputStyle);
    url.searchParams.set('Version', apiVersion);

    const response = await fetch(url);

    const data = await response.json();

    console.log('ddd', data);
};

// ! HOME 슬라이드 추천도서 가져오기
const loadSlideBooks = async () => {
    const url = new URL(
        `https://corsproxy.io/?http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbKey}`
    );
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

    let newWidth =
        (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWidth;
};

//초기 위치 세팅
const setInitialPosition = () => {
    let initialTranslateValue = -(
        (slideWidth + slideMargin) *
        slideItem.length
    );
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

    $.getJSON(url + '?callback=?', data, callback);
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

// * -------------
// * 실행 영역
// * -------------
// ! 페이지 로드 후 실행이 필요한 기능

loadSlideBooks();
console.log('start-update');
