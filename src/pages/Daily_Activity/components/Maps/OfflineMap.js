/* global L */
import React, { useState } from "react";
import L from "leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline } from "react-leaflet";
import { useEffect } from "react";
import AirplaneMarker from "./AirplaneMarker";
import { Button, Input, Radio, Statistic } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import moment from "moment";
import { useStoreName } from "../../../../store/namesStore";
const OfflineMap = ({ data }) => {
  const id = useStoreName((state) => state.id);
  const [center, setCenter] = useState([36.426864, 127.258432]);
  const [map, setMap] = useState();
  const [polyLine, setPolyLine] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [play, setPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState("-");

  // 다른 병사를 선택할때 초기화
  useEffect(() => {
    setPolyLine([]);
    setTime();
    setCurrentTrack([]);
    setPlay(false);
    setSpeed(1);
  }, [id]);

  // 오프라인 맵 받아오기
  useEffect(() => {
    // if (data?.length) {
    if (map) {
      const tileLayerOffline = L.tileLayer.offline("220720/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abc",
      });
      tileLayerOffline.addTo(map); //오프라인 맵 넣기

      if (data?.length) {
        map.setView(new L.LatLng(data[0]?.lat, data[0]?.lng), 16); // 자기 데이터의 첫 포인트로 center 변경
      }
    }
    // }
  }, [map, data]);

  // 폴리라인 그리기
  let cursor = 0;
  useEffect(() => {
    // Play 시 경로 폴리라인 그림
    if (data?.length && play) {
      setCurrentTrack(data[cursor]);
      setPolyLine((state) => {
        return [...state, [data[cursor].lat, data[cursor].lng]];
      });
      setTime((state) => {
        return moment(data[cursor]?.__time).format("YYYY/MM/DD HH:mm:ss");
      });

      const interval = setInterval(() => {
        if (cursor === data.length - 1) {
          cursor = 0;
          setCurrentTrack(data[cursor]);
          setPolyLine([[data[cursor]?.lat, data[cursor]?.lng]]);
          setTime((state) => {
            return moment(data[cursor]?.__time).format("YYYY/MM/DD HH:mm:ss");
          });
          return;
        }

        cursor += 1;
        setCurrentTrack(data[cursor]);
        setPolyLine((state) => {
          return [...state, [data[cursor]?.lat, data[cursor]?.lng]];
        });
        setTime((state) => {
          return moment(data[cursor]?.__time).format("YYYY/MM/DD HH:mm:ss");
        });

        return () => {
          setPolyLine([]);
          setTime();
          setCurrentTrack([]);
        };
      }, speed);

      return () => {
        clearInterval(interval);
      };
    }
    // Pause 시 전체 폴리라인 보여줌
    if (data?.length && !play) {
      const lines = [];

      data?.map((list) => {
        lines.push([list.lat, list.lng]);
      });
      setPolyLine(lines);
    }
    // 데이터 없으면 폴리건 초기화
    if (!data?.length) {
      setPolyLine([]);
    }
  }, [data, play]);

  // 속도 조절
  const _changeRadio = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <>
      <div
        className="flex-between-row border-dash"
        style={{ marginBottom: "1em" }}
      >
        <div className="flex-between-row">
          <Radio.Group onChange={_changeRadio} value={speed}>
            <Radio disabled={play} value={1000}>
              x0.1
            </Radio>
            <Radio disabled={play} value={100}>
              x1
            </Radio>
            <Radio disabled={play} value={10}>
              x10
            </Radio>
            <Radio disabled={play} value={1}>
              x100
            </Radio>
          </Radio.Group>
          <Button
            onClick={() => {
              if (!play) {
                setPolyLine([]);
              }
              setPlay(!play);
            }}
          >
            {play ? <PauseOutlined /> : <CaretRightOutlined />}
          </Button>
          <Button
            onClick={() => {
              map.setView(new L.LatLng(36.426864, 127.258432), 16);
            }}
          >
            32사단으로 이동
          </Button>

          {/* <Button
            onClick={() => {
              map.setView(new L.LatLng(36.3818203333333, 127.366367833333), 16);
            }}
          >
            에트리로 이동
          </Button> */}
        </div>

        <Statistic value={time} className="count_daily_activity" />
      </div>

      <MapContainer
        style={{ width: "100%", height: "500px" }}
        // center={[36.3818203333333, 127.366367833333]}
        center={center}
        zoom={16}
        minZoom={16}
        maxZoom={18}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        {/* {play && <AirplaneMarker data={currentTrack ?? {}} />} */}

        <Polyline
          positions={polyLine}
          pathOptions={{ color: "red", weight: "6" }}
        />
      </MapContainer>
    </>
  );
};

export default OfflineMap;
