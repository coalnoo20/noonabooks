// * 전역 설정

// * const

const urlAPI = "corsproxy.io/?http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

const ttbKey = `ttblusci2359001`;

let url = new URL(`https://${urlAPI}?ttbkey=${ttbKey}`);

// ! 일반 상수

// ! API 영역

// ? 알라딘 API 원 구조 예시
// `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblusci2359001&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`

// * let

// ! 일반 변수

let bookList = [];

let callback = [];

let data = "";

// ! 쿼리 영역

let query = "aladdin";

let queryType = "Title";

let maxResults = 10;

let resultStart = 1;

let SearchTarget = "Book";

let outputStyle = "js";

let apiVersion = "20131101";

// * html control

// * 함수 영역

// ! 알라딘 ItemSearch 가져오기

const getList = async () => {
  console.log("get list");

  url.searchParams.set("Query", query);
  url.searchParams.set("QueryType", queryType);
  url.searchParams.set("MaxResult", maxResults);
  url.searchParams.set("start", resultStart);
  url.searchParams.set("SearchTarget", SearchTarget);
  url.searchParams.set("output", outputStyle);
  url.searchParams.set("Version", apiVersion);

  const response = await fetch(url);

  const data = await response.json();

  console.log("ddd", data);
};

// * 구글 map api 영역

const mapElement = document.getElementById("map");

const map = new google.maps.Map(mapElement, {
  center: { lat: 37.65816, lng: 126.7635 },
  zoom: 15,
});

const marker = new google.maps.Marker({
  position: { lat: 37.65816, lng: 126.7635 },
  map: map,
  title: "Team20 위치",
});

// * 테스트 코드 영역

// ! JSONP 테스트

const testJSONP = () => {
  //         $.ajax({
  //         url: url,
  //         dataType: 'jsonp',
  //         jsonpCallback: "myCallback",
  //         success: callback
  //       });

  //       console.log(myCallback);

  $.getJSON(url + "?callback=?", data, callback);
};

//       $.getJSON(url + "?callback=?", data, callback);

const testScript = () => {
  var script = document.createElement("script");
  script.src = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblusci2359001&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

  document.getElementsByTagName("head")[0].appendChild(script);

  function myCallback(data) {
    //callback method
  }
};

// * 실행 영역

console.log("run");
