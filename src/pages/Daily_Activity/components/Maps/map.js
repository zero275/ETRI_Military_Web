/*global kakao */
import { useEffect, useRef, useState } from "react";
// const { kakao } = window;
const Map = ({ data }) => {
  //   console.log(data);

  const temp = [];
  if (data?.length) {
    for (let index = 0; index < 50; index++) {
      temp?.push(data[index]);
    }
  }
  console.log(temp);
  useEffect(() => {
    const container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(36.3818203333333, 127.366367833333),
      level: 4,
    };

    let lingPaths = [];

    data?.map((list) => {
      lingPaths.push(new kakao.maps.LatLng(list.lat, list.lng));
    });

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: lingPaths, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FFAE00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    let map = new kakao.maps.Map(container, options);
    // 지도에 선을 표시합니다
    polyline.setMap(map);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      36.3818203333333,
      127.366367833333
    );

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    var iwContent =
      '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const iwPosition = new kakao.maps.LatLng(
      36.3818203333333,
      127.366367833333
    ); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    // infowindow.open(map, marker);

    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);
    });

    // 마커에 마우스아웃 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseout", function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infowindow.close();
    });
  }, [data]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default Map;
