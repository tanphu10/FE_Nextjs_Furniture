"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Settings } from "react-slick";
import { styled } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/material";
import ItemMain from "./item.slider";
import { sendRequest } from "@/src/utils/api";
import { useRouter } from "next/navigation";
interface IProps {
  data: ITypeItem[];
  items: Iitems[];
}

function MainSlider(props: IProps) {
  const [type, setType] = useState<ITypeItem[] | null>();
  const [fur, setFur] = useState<Iitems[] | null>();
  const router = useRouter();
  console.log("check", fur);
  const { data, items } = props;
  useEffect(() => {
    setType(data);
  }, [data]);
  useEffect(() => {
    setFur(items);
  }, [items]);
  // console.log("check type props", type);
  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          zIndex: 2,
          minWidth: 20,
          width: 35,
          // left: 0,
          right: "50px",
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  const settings: Settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    // slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplaySpeed: 10,
    vertical: true,
    slidesToScroll: 2,
    swipeToSlide: true,
  };

  const handleTypeItem = async (id: number) => {
    // console.log("first", id);
    const resType = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/type/${id}`,
      method: "GET",
    });
    // console.log("check type res>>>>", resType.data.content);
    let item = resType.data?.content;
    await sendRequest<IBackendRes<any>>({
      url: `/api/revalidate`,
      method: "POST",
      queryParams: "get-by-item",
    });
    setFur(item);
    router.refresh();
    // console.log("ccccccc", fur);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "60px 0",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: "25%",
            margin: "20px 0",
            ".track": {
              padding: "0 20px",
              img: {
                height: 50,
                width: 150,
              },
            },
          }}
        >
          <Slider {...settings}>
            {type?.map((item) => {
              return (
                <div
                  className="track"
                  key={item.id}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.icons}`}
                    alt=""
                  />
                  <Button
                    onClick={() => {
                      handleTypeItem(item.id);
                    }}
                    style={{
                      textDecoration: "unset",
                      color: "black",
                      // alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <h4>{item.type_name}</h4>
                  </Button>
                </div>
              );
            })}
          </Slider>
        </Box>
        <Box sx={{ width: "75%", marginLeft: "25%" }}>
          <Grid container spacing={2}>
            {fur?.map((item, index: number) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <ItemMain data={item} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default MainSlider;
