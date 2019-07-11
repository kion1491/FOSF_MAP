var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// navigator.geolocation.getCurrentPosition(function (position) {

//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;

//     return latitude, longitude;
// })

function test() {
    var apple = "사과";
    var pear = "배";
    var arr = [apple, pear]
    return arr
}

function deep() {
    return test();
}

console.log(deep())

function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function (position) {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            return latitude, longitude;
        }, function (error) {
            console.error(error);
        }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
            });
    } else {
        alert('GPS를 지원하지 않습니다');
    }
    console.log()
}

getLocation();


var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
var mapOption = {
    // func: navigator.geolocation.getCurrentPosition(function (pos) {
    //     var latitude = pos.coords.latitude;
    //     var longitude = pos.coords.longitude;
    //     //alert("현재 위치는 : " + latitude + ", " + longitude);
    // }),
    //center: new kakao.maps.LatLng(37.502976, 127.05464319999999), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

navigator.geolocation.getCurrentPosition((position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var positionArray = [latitude, longitude]

    return mapOption.center = positionArray
})
console.log(mapOption)
//37.502976, 127.05464319999999


// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 키워드로 장소를 검색합니다
ps.keywordSearch('동물병원', placesSearchCB);

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}