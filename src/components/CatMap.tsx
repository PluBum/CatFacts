import { CatResponse, CatImageResponse, GetFactsResponse } from "../model";
// import Swiper core and required modules

import { CatsCardComponent } from "./CatCardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../style/style.css";
import { useCallback, useEffect, useState } from "react";
import {
  getData,
  getFactsData,
  getImageData,
  getNextData,
} from "./CatsRequest";

export const MapCats: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cats, setCats] = useState<CatResponse[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const initialAction = useCallback(async () => {
    try {
      setLoading(true);
      const { data: parameters } = await getData(1);
      setCats(parameters);
      const { data: facts } = await getFactsData(1);
      const data = await getImageData();
      console.log(1);
      console.log(12);

      setCats((oldCats) =>
        oldCats?.map((cat, index) => ({
          ...cat,
          image: data[index]?.url,
          fact: facts[index]?.fact,
        }))
      );

      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }, []);

  const handleReachEnd = async () => {
    setCurrentPage(currentPage + 1);

    //  загрузка новых карточек
    try {
      const { data: nextParameters } = await getData(currentPage + 1); //передаю некст стр
      const { data: nextFacts } = await getFactsData(currentPage + 1); //передаю некст стр
      const data = await getImageData();

      let nextCatsArray = nextParameters?.map((nextCat, index) => ({
        ...nextCat,
        image: data[index]?.url,
        fact: nextFacts[index]?.fact,
      }));
      cats && setCats([...cats, ...nextCatsArray]);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    initialAction();
  }, []);

  if (error)
    return (
      <div>
        <img
          src="https://i.gifer.com/QrJJ.gif"
          style={{
            display: "block",
            margin: "0 auto",
            width: "100vw",
            height: "100vh",
          }}
        />
      </div>
    );

  if (loading)
    return (
      <div>
        <img
          src="https://komfydom.ru/image/catalog/lazyload/lazyload.gif"
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>
    );

  if (!cats) return <div>cats undefined</div>;

  return (
    <div className="container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true, type: "progressbar" }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
        onReachEnd={handleReachEnd}
      >
        {cats.map((cat) => (
          <SwiperSlide
            className="card"
            style={{ textAlign: "center" }}
            key={cat.image}
          >
            <CatsCardComponent
              breed={cat.breed}
              country={cat.country}
              origin={cat.origin}
              coat={cat.coat}
              pattern={cat.pattern}
              imageUrl={cat.image}
              facts={cat.fact}
            ></CatsCardComponent>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MapCats;
