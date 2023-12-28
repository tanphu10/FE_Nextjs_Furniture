"use client";
import React from "react";
import Slider from "react-slick";
interface IProps {
  resPhoto: IPhoto[];
}
const CardItem = (props: IProps) => {
  const { resPhoto } = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {resPhoto?.map((item) => {
        return (
          <>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.photo_1}`}
                alt=""
              />
            </div>
          </>
        );
      })}
    </Slider>
  );
};
export default CardItem;

// import React from "react";
// import Slider from "react-slick";

// export default function CardItem() {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       {/* <div>
//         <h3>6</h3>
//       </div> */}
//     </Slider>
//   );
// }
