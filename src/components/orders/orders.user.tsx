"use client";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
interface IProps {
  arrItem: IItemBooked[];
}
const OrdersUser = (props: IProps) => {
  const { arrItem } = props;
  //   console.log("arrItem", arrItem);
  return (
    <>
      <Box sx={{ width: "100%", marginTop: "100px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {arrItem?.map((item, index: number) => {
            return (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.items?.photo}`}
                    alt="Live from space album cover"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ alignItems: "end", cursor: "pointer" }}>
                      ...
                    </span>
                    <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
                      <Typography component="div" variant="h5">
                        tên sản phẩm: {item?.items?.name_item}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        số lượng : {item?.number}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        ghi chú: {item?.notice}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // pl: 1,
                        pb: 1,
                      }}
                    >
                      tên user: {item?.users?.full_name}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
export default OrdersUser;
