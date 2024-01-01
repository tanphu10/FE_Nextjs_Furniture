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
  TextField,
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
import "./order.css";
interface IProps {
  arrItem: IItemBooked[];
}
const EditOrder = (props: IProps) => {
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

  // ------ hiện thị xóa

  const [dele, setDele] = useState(false);
  const [notice, setNotice] = useState("");
  const handleClickDele = () => {
    setDele(true);
  };
  const handleCloseDele = () => {
    setDele(false);
  };
  const handleCancle = async (id: number) => {
    const resDel = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/req/delete`,
      method: "POST",
      body: {
        book_id: id,
        date_on: new Date(),
        date_out: new Date(),
        notice: notice,
      },
    });
    // console.log(resDel);
    // console.log("check get id orders", res);
    if (resDel && resDel?.statusCode === 200) {
      // redirect to home với server
      setOpen(true);
      setResult(true);
      setResMessage(resDel?.message);
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

  // -----
  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const [update, setUpdate] = useState({
    number: 1,
    notice: "",
  });

  const handleEdit = async (id: number) => {
    // --------- nhấn nút edit là get id để render lại giao diện cho người dùng chỉnh sửa
    const res = await sendRequest<IBackendRes<IModelPaginate<Iitems>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/item/${id}`,
      method: "POST",
      body: {
        book_id: id,
        date_on: new Date(),
        date_out: new Date(),
        notice: update.notice,
        number: update.number,
      },
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
        <div>Các đơn hàng đã được xóa</div>
        <hr />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {arrItem?.map((item, index: number) => {
            // console.log("check item", item);
            if (item.confirm == false) {
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
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          cursor: "pointer",
                        }}
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
                  <Dialog open={pop} onClose={handleClosePopup}>
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Subscribe
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        bạn có muốn chỉnh sửa hoặc hủy đơn không ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClosePopup}>
                        Hủy
                      </Button>
                      <Button
                        autoFocus
                        onClick={() => {
                          handleClickDele();
                          handleClosePopup();
                        }}
                      >
                        Hủy đơn hàng
                      </Button>
                      <Button
                        onClick={() => {
                          handleClickEdit();
                          handleClosePopup();
                        }}
                      >
                        chỉnh sửa
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* --- hiển thị lần 2 ghi chú xóa  */}
                  <Dialog open={dele} onClose={handleCloseDele}>
                    <DialogTitle style={{ cursor: "move" }}>
                      Yêu cầu hủy đơn hàng
                    </DialogTitle>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        label="ghi chú"
                        variant="standard"
                        onChange={(event) => {
                          setNotice(event.target.value);
                        }}
                      />
                    </Box>
                    <DialogActions>
                      <Button autoFocus onClick={handleCloseDele}>
                        Hủy
                      </Button>
                      <Button
                        autoFocus
                        onClick={() => {
                          handleCancle(item.id);
                          setDele(false);
                        }}
                      >
                        gửi yêu cầu hủy đơn
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* --- hiển thị lần 3 ghi chú chỉnh sửa  */}
                  <Dialog open={edit} onClose={handleCloseEdit}>
                    <DialogTitle style={{ cursor: "move" }}>
                      Yêu cầu chỉnh sửa đơn hàng
                    </DialogTitle>
                    <CardContent>
                      <div style={{ marginBottom: "10px" }}>
                        TanPhu Furniture
                      </div>
                      <div>Số Lượng</div>

                      <div style={{ display: "flex", margin: "20px" }}>
                        <Button
                          style={{ border: "1px solid black" }}
                          onClick={() => {
                            setUpdate({ ...update, number: update.number - 1 });
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
                          {update.number > 1 ? update.number : 1}
                        </Button>
                        <Button
                          style={{ border: "1px solid black" }}
                          onClick={() => {
                            setUpdate({ ...update, number: update.number + 1 });
                          }}
                        >
                          +
                        </Button>
                      </div>
                      <Typography variant="body2">
                        Tạm tính :{" "}
                        {item.items.price *
                          (update.number > 0 ? update.number : 1)}
                        $
                      </Typography>
                    </CardContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleCloseEdit}>
                        Hủy
                      </Button>
                      <Button
                        autoFocus
                        onClick={() => {
                          handleEdit(item.id);
                          setEdit(false);
                        }}
                      >
                        gửi yêu cầu Edit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </>
  );
};
export default EditOrder;
