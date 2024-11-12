import React, { useState, useEffect } from "react";
import styled                         from "styled-components";
import { useLocation, useNavigate }   from "react-router-dom";
import Header                         from "../map/Header";
import { Sheet }                      from 'react-modal-sheet';
import BookmarkList                   from "../bookmark/BookmarkList";
import CreateBookmark                 from "../bookmark/CreateBookmark";
import Footer                         from "../layout/footer/Footer";
import { Map, MapMarker }                        from "react-kakao-maps-sdk"
import axios from "axios";
import api from "../api/axios";
import PlaceInfoSheet from "../map/PlaceInfoSheet";
import InfoItem from "../map/InfoItem";
import PlaceInfoBottom from "../map/PlaceInfoBottom";

function MapPage() {
    const location                      = useLocation();
    const navigate                      = useNavigate();
    const [isOpen,       setOpen      ] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isPlaceInfoOpen, setPlaceInfoOpen] = useState(false);
    const [places,       setPlaces    ] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState();
    const [bookmarkPlaces, setBoomarkPlaces] = useState([]);
    const [bookmarkCnt, setBookmarkCnt] = useState([]);

    useEffect(() => {
        if (location.state?.openBookmarkSheet) {
            setOpen(true);
        }
    }, [location.state]);

    useEffect(() => {
        api.get("/place/list")
        .then((res) => {
            setPlaces(res.data);
            console.log(res.data);
        });
    }, []);

    const selectedPlaceData = places.find(place => place.placeName === selectedPlaces);

    useEffect(()=> {
        if (selectedPlaceData) {
            let place_id = selectedPlaceData?.place_id;
            console.log(selectedPlaceData?.place_id);
            api.get(`/bookmarks/place/counts/${place_id}`)
            .then((res) => {
                setBookmarkCnt(res.data);
                console.log(bookmarkCnt);
            });
        }   
    }, [selectedPlaces]);

    const handleBackPageClick = () => {
        navigate(-1, { state: { openBookmarkSheet: true } });
    };

  return (
    <Main>
      <Header onClickBookmark={() => setOpen(true)} />
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{width: "430px", height: "932px"}}>
                {places.map((place) => (
                        <MapMarker
                        key={`${place.place_id}`}
                        position={{lat: place.placeLat, lng: place.placeLng}} // 마커를 표시할 위치
                        image={{
                            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                            size: {
                            width: 24,
                            height: 35
                            }, // 마커이미지의 크기입니다
                        }}
                        title={place.placeName} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        onClick={(marker) => {
                            setSelectedPlaces(marker.getTitle());
                            console.log(marker);
                            console.log(selectedPlaces);
                            setPlaceInfoOpen(true);
                        }}
                        />
                    ))}
            </Map>
      <CustomSheet
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          navigate('/homepage', { replace: true });
        }}
        snapPoints={[700, 400, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <BookmarkList
              onOpenCreate={() => {
                setOpen(false);
                setCreateOpen(true);
              }}
            
                            setBoomarkPlaces={setBoomarkPlaces}/>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onClick={() => {
            setOpen(false);
            navigate('/homepage', { replace: true });
          }}
        />
      </CustomSheet>
      <CustomSheet
        isOpen={isCreateOpen}
        onClose={() => {
          setCreateOpen(false);
          setOpen(true);
        }}
        snapPoints={[500, 500, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <CreateBookmark
              onCancel={() => {
                setCreateOpen(false);
                setOpen(true);
              }}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onClick={() => {
            setCreateOpen(false);
            setOpen(true);
          }}
        />
      </CustomSheet>
            <CustomSheet isOpen={isPlaceInfoOpen}
                         onClose={() => {
                            setCreateOpen(false);
                            setOpen(false);
                            setPlaceInfoOpen(false);
                         }}
                         snapPoints={[932, 500, 0]} initialSnap={1}
                         style={{zIndex: 10}}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <PlaceInfoSheet style={{zIndex: 100}}
                                        place_id={selectedPlaceData?.place_id}
                                        placeName={selectedPlaceData?.placeName} 
                                        placeAddress={selectedPlaceData?.placeAddress} 
                                        placeTele={selectedPlaceData?.placeTele}/>
                                        
                        <PlaceInfoBottom    placeAddress={selectedPlaceData?.placeAddress} 
                                            placeTele={selectedPlaceData?.placeTele}
                                            bookmarkCnt={bookmarkCnt}/>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onClick={() => {
                            setCreateOpen(false);
                            setOpen(false);
                            setPlaceInfoOpen(false);
                                }} />
            </CustomSheet>
      <Footer />
    </Main>
  );
}

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    max-height: 932px;
    min-height: 732px;
    background: #FFF4D2;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

const CustomSheet = styled(Sheet)`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 102px;
  max-width: 430px;
  z-index: 5;

    /* sheet 라이브러리 css 덮어 쓰려면 !important 끝에 들어가야합니다 */
    .react-modal-sheet-backdrop {
        position: absolute !important;
        width: 430px !important;
        margin-bottom: 100px !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
    }
    .react-modal-sheet-container {
        background-color: #FFFFFF !important;
        border-radius: 20px 20px 0px 0px !important;
        padding-top: 10px !important;
    }
    .react-modal-sheet-header {
        cursor: pointer !important;
    }
    .react-modal-sheet-drag-indicator {
        background: #999 !important;
        border-radius: 5px !important;
        cursor: grab;
    }
    .react-modal-sheet-content {
        margin: 10px 20px !important;
        overflow-y: auto;

        /* 스크롤바 숨기기 */
        -ms-overflow-style: none;  /* IE 및 Edge */
        scrollbar-width: none;  /* Firefox */
    }
    .react-modal-sheet-content::-webkit-scrollbar {
        display: none;  /* Chrome, Safari 및 Opera */
    }
`;



export default MapPage;
