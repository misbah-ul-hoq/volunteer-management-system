import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useFetch from "../../hooks/useFetch";
import { Fade } from "react-awesome-reveal";
const Sliders = () => {
  const { data, loading } = useFetch("/volunteers");
  if (loading) return <div className="skeleton h-32 w-32"></div>;
  return (
    <div className="container-center my-10">
      <Fade fraction={0.5} triggerOnce>
        <Swiper
          // slidesPerView={1}
          // spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {data?.map((item) => (
            <SwiperSlide
              key={item._id}
              className="flex flex-col gap-2 bg-base-300 rounded-lg p-4"
            >
              <img
                src={item?.thumbnailURL}
                alt=""
                className="max-w-64 h-32 rounded-sm"
              />{" "}
              {item?.title}
              <h3 className="text-lg font-semibold">
                Title: {item?.postTitle}
              </h3>
              <p>Category: {item?.category}</p>
              <p className="mb-10">Needed: {item?.numberOfVolunteers} people</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Fade>
    </div>
  );
};

export default Sliders;
