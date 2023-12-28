"use client";
import CommentItem from "./cmt.item";
import LikeItem from "./like.item";
import GradeIcon from "@mui/icons-material/Grade";
import Container, {
  Alert,
  CardActionArea,
  CardMedia,
  IconButton,
  Snackbar,
  Stack,
} from "@mui/material";
import "./detail.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sendRequest } from "@/src/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CardItem from "./card.item";
// import CardItem from "./card.item";
// https://mui.com/material-ui/react-stepper/
interface IProps {
  item: Iitems;
  resLike: ILike[];
  resCmt: ICmt[];
  resPhoto: IPhoto[];
}
const DetailItem = (props: IProps) => {
  // console.log(props.resPhoto);
  let { item, resLike, resCmt, resPhoto } = props;
  // let { id } = item;
  let rates = resCmt.reduce((total, product, index) => {
    return (total += product.rate);
  }, 0);

  // console.log("total rate", );
  const { data: session } = useSession();
  const userId = session?.user?.id;
  let data = rates / resCmt.length;
  const [value, setValue] = useState<number>(1);
  // console.log("check value", value);
  const router = useRouter();
  const [resMessage, setResMessage] = useState<string>("");
  // console.log(resMessage);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(false);
  const handleBuy = async () => {
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`,
      method: "POST",
      body: {
        item_id: item.id,
        user_id: userId,
        number: value,
        notice: "mua hàng",
        date_on: new Date(),
        date_out: new Date(),
      },
    });
    // console.log("check data book item >>>", res);
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
  const handleAddcart = async () => {
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-cart`,
      method: "POST",
      body: {
        item_id: item.id,
        user_id: userId,
        number: value,
      },
    });
    // console.log("check data book item >>>", res);
    if (res && res?.statusCode === 200) {
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
      setResMessage("đặt hàng thất bại");
    }
  };
  return (
    <>
      <div style={{ margin: "80px 50px 20px" }}>
        {/* <div></div> */}
        <CardItem resPhoto={resPhoto} />
        {/* <Card sx={{ width: 700 }}>
          <CardActionArea>
            <CardMedia
              // sx={{ padding: "10px" }}
              component="img"
              height="100%"
              width="100%"
              image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.photo}`}
              alt="green iguana"
            />
          </CardActionArea>
        </Card> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            // gap: 10,
            marginTop: 50,
            height: 330,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                // sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Tên sản phẩm: {item?.name_item}
              </Typography>
              <Typography sx={{ fontSize: 20, mb: 1.5 }} color="oranged">
                Price: {item?.price}$
              </Typography>
              <Typography variant="body2">
                description : {item.description}
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
            <CardContent>
              <div style={{ marginBottom: "10px" }}>TanPhu Furniture</div>
              <div>Số Lượng</div>

              <div style={{ display: "flex", margin: "20px" }}>
                <Button
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    setValue(value - 1);
                  }}
                >
                  -
                </Button>
                <Button style={{ border: "1px solid black", margin: "0 10px" }}>
                  {value > 1 ? value : 1}
                </Button>
                <Button
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    setValue(value + 1);
                  }}
                >
                  +
                </Button>
              </div>
              <Typography variant="body2">
                Tạm tính : {item.price * (value > 0 ? value : 1)}$
              </Typography>
            </CardContent>
            <div style={{ padding: "0 10px" }}>
              <hr />
            </div>
            <div style={{ display: "flex", margin: "20px", gap: "10px" }}>
              <div>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleBuy();
                  }}
                >
                  Mua Ngay
                </Button>
                <Snackbar
                  open={open}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
              </div>
              <br />
              <Button
                onClick={() => {
                  handleAddcart();
                }}
                variant="outlined"
                color="success"
              >
                Thêm vào giỏ
              </Button>
            </div>
          </Card>
        </div>
        <div>
          <LikeItem resLike={resLike} resCmt={resCmt} item={item} />
        </div>
        <div>
          <CommentItem resCmt={resCmt || []} item={item} />
        </div>
      </div>
    </>
  );
};

export default DetailItem;
