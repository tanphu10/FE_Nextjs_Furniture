"use client";
import * as React from "react";

import { sendRequest } from "@/src/utils/api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  CartItem: IAddCart[];
}
const AddCart = (props: IProps) => {
  // console.log(props);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { CartItem } = props;

  const [value, setValue] = useState({
    num: 1,
    checkId: 1,
    notice: "",
  });
  //   console.log("check value", value);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(false);
  const [resMessage, setResMessage] = useState<string>("");
  const handleBuy = async (items: any) => {
    console.log(items);
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`,
      method: "POST",
      body: {
        item_id: items.id,
        user_id: userId,
        number: value.num,
        notice: "mua hàng",
        date_on: new Date(),
        date_out: new Date(),
      },
    });

    console.log("check data book item >>>", res);
    if (res && res?.statusCode === 200) {
      // redirect to home với server
      setOpen(true);
      setResult(true);
      setResMessage(res?.message);
      await sendRequest<IBackendRes<any>>({
        url: `/api/revalidate`,
        method: "POST",
        queryParams: {
          tag: "get-booked-item",
        },
      });
      router.refresh();
    } else {
      setOpen(true);
      setResMessage("đặt hàng thất bại");
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // xử lí popop

  const [pop, setPop] = React.useState(false);

  const handleClickOpen = () => {
    setPop(true);
  };

  const handleClosePopup = () => {
    setPop(false);
  };

  const handleDelete = async (id: number) => {
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-cart/${id}`,
      method: "DELETE",
    });
    if (res && res?.statusCode === 200) {
      // redirect to home với server
      setOpen(true);
      setResult(true);
      setResMessage(res?.message);
      await sendRequest<IBackendRes<any>>({
        url: `/api/revalidate`,
        method: "POST",
        queryParams: {
          tag: "get-cart-user-item",
        },
      });
      router.refresh();
    } else {
      setOpen(true);
      setResMessage("xóa thất bại");
    }
  };
  return (
    <>
      <Box sx={{ width: "100%", marginTop: "100px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {CartItem.map((item, index) => {
            // console.log(item.id
            return (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  <CardActionArea sx={{ width: 400 }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      width="100%"
                      image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.items.photo}`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                  <Card>
                    <CardContent>
                      <Typography
                        // sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Tên sản phẩm: {item?.items.name_item}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 20, mb: 1.5 }}
                        color="oranged"
                      >
                        Price: {item?.items.price}$
                      </Typography>
                      <Typography variant="body2">
                        description : {item.items.description}
                      </Typography>
                    </CardContent>
                    <div style={{ padding: "0 10px" }}>
                      <hr />
                    </div>
                    <CardActions>
                      <Typography
                        // sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Thông tin vận chuyển: giao đến đại chỉ abc
                      </Typography>
                      <hr />
                    </CardActions>
                    <CardActions>
                      <Typography
                        // sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        giao siêu tốc : trước 15h hôm nay :2$ ship
                      </Typography>
                    </CardActions>
                  </Card>
                  <Card>
                    <CardContent sx={{ padding: "10px", marginBottom: "10px" }}>
                      <div style={{ marginBottom: "10px" }}>
                        TanPhu Furniture
                      </div>
                      <div>Số Lượng</div>
                      <div style={{ display: "flex", margin: "10px 0" }}>
                        <Button
                          style={{ border: "1px solid black" }}
                          onClick={() => {
                            if (value.num < 1) {
                              handleClickOpen();
                            } else {
                              setValue({
                                ...value,
                                checkId: item.id,
                                num: value.num - 1,
                              });
                            }
                          }}
                        >
                          -
                        </Button>
                        <Button
                          style={{
                            border: "1px solid black",
                            margin: "0 10px",
                          }}
                        >
                          {value.checkId === item.id && value.num > 0
                            ? value.num
                            : 1}
                        </Button>
                        <Button
                          style={{ border: "1px solid black" }}
                          onClick={() => {
                            setValue({
                              ...value,
                              checkId: item.id,
                              num: value.num + 1,
                            });
                          }}
                        >
                          +
                        </Button>
                      </div>

                      <hr />
                      <TextField
                        fullWidth
                        label="ghi chú"
                        multiline
                        rows={3}
                        variant="standard"
                        onChange={(event) => {
                          setValue({ ...value, notice: event.target.value });
                        }}
                      />
                      <Typography sx={{ margin: "10px 0" }} variant="body2">
                        Tạm tính :{" "}
                        {item.items.price *
                          (value.checkId === item.id && value.num > 1
                            ? value.num
                            : 1)}
                        $
                      </Typography>
                    </CardContent>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleBuy(item.items);
                        }}
                      >
                        Mua Ngay
                      </Button>
                      <Snackbar
                        open={open}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        onClose={handleClose}
                        // action={action}
                      >
                        <Alert
                          onClose={() => {
                            setOpen(false);
                          }}
                          severity={result ? "success" : "error"}
                          // severity="error"
                          sx={{ width: "100%" }}
                        >
                          {resMessage}
                        </Alert>
                      </Snackbar>
                      <Dialog
                        open={pop}
                        onClose={handleClosePopup}
                        //   PaperComponent={PaperComponent}
                        //   aria-labelledby="draggable-dialog-title"
                      >
                        <DialogTitle
                          style={{ cursor: "move" }}
                          id="draggable-dialog-title"
                        >
                          Subscribe
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            bạn có muốn xóa khỏi cart không ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClosePopup}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                              handleClosePopup();
                            }}
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Card>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default AddCart;
