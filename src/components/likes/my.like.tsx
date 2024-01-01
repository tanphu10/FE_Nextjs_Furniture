"use client";
import { Grid } from "@mui/material";
import Box from "next-auth/providers/box";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
interface IProps {
  like: ILike[];
}
const MyLike = (props: IProps) => {
  // console.log(props.like);
  const { like } = props;
  // console.log(like);
  return (
    <Container>
      <div id="mylike" style={{ width: "100%", margin: "70px 0" }}>
        <div style={{ padding: " 0 20px", marginTop:"100px 0" }}>
          Danh sách các đơn hàng bạn yêu thích
          <hr />
        </div>

        <Grid container spacing={2} style={{ padding: " 0 20px" }}>
          {like?.map((like, index: number) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ maxWidth: 600, margin: "10px 0" }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${like.items.photo}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {like.items.name_item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {like.items.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      style={{
                        textDecoration: "unset",
                      }}
                      href={`/detail/${like.items.name_item}-${like.items.id}.html`}
                    >
                      Detail
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Container>
  );
};

export default MyLike;
