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

// * -------------
// * 함수 영역 - html/css/ui 관련
// * -------------

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

console.log('start-update');
