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
interface IProps {
  data: ITypeItem[];
  items: Iitems[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MainSlider(props: IProps) {
  const [type, setType] = useState<ITypeItem[] | null>();
  const { data, items } = props;
  useEffect(() => {
    setType(data);
  }, [data]);
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
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  const settings: Settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const handleTypeItem = async (id: number) => {
    console.log("first");
    const resType = await sendRequest<IBackendRes<ITypeItem>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/type/${id}`,
      method: "GET",
    });
    console.log("check type res>>>>", resType);
  };
  return (
    <>
      <Box
        sx={{
          margin: "50px 0",
          ".track": {
            padding: "0 20px",
            img: {
              height: 150,
              width: 150,
            },
          },
          // h3: {
          //   border: "1px solid #ccc",
          //   padding: "20px",
          //   height: "200px",
          // },
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
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          {items?.map((item, index: number) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <ItemMain data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default MainSlider;
