"use client";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { sendRequest } from "@/src/utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./order.css"
interface IProps {
  arrItem: IItemBooked[];
}
const OrdersUser = (props: IProps) => {
  const { arrItem } = props;
  //   console.log("arrItem", arrItem);
  const { data: session } = useSession();
  const userId = session?.user.id;

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

  const [pop, setPop] = useState(false);

  const handleClickOpen = () => {
    setPop(true);
  };

  const handleClosePopup = () => {
    setPop(false);
  };
  const handleEdit = async (id: number) => {
    // --------- nhấn nút edit là get id để render lại giao diện cho người dùng chỉnh sửa
    const res = await sendRequest<IBackendRes<IModelPaginate<Iitems>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/item/${id}`,
      method: "GET",
    });
    console.log("check get id orders", res);
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
                    <span
                      style={{ alignItems: "end", cursor: "pointer" }}
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
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
                      bạn có muốn chỉnh sửa không ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClosePopup}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        console.log(item.id);
                        handleEdit(item.id);
                        handleClosePopup();
                      }}
                    >
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
export default OrdersUser;
