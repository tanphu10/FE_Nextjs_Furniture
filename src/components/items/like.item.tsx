"use client";
import { Chip, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { sendRequest } from "@/src/utils/api";
import { useRouter } from "next/navigation";
import GradeIcon from "@mui/icons-material/Grade";
import { useSession } from "next-auth/react";
import { Container } from "@mui/material";

interface IProps {
  resLike: ILike[];
  resCmt: ICmt[];
  item: Iitems;
}
const LikeItem = (props: IProps) => {
  //   console.log(props.resLike);
  const { data: session } = useSession();
  let user_id = session?.user.id;
  let { resLike, resCmt, item } = props;
  console.log("resLike", resLike);
  let { id } = item;
  let rates = resCmt.reduce((total, product, index) => {
    return (total += product.rate);
  }, 0);

  // console.log("total rate", );
  let data = rates / resCmt.length;
  const router = useRouter();

  const handleLikeItem = async () => {
    await sendRequest<IBackendRes<IModelPaginate<ILike>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/like`,
      method: "POST",
      body: {
        item_id: id,
        user_id: user_id,
        date_like: new Date(),
        quantity: resLike?.some((t) => t.item_id === id) ? true : false,
      },

    });
    await sendRequest<IBackendRes<any>>({
      url: `/api/revalidate`,
      method: "POST",
      queryParams: {
        tag: "get-by-like-id",
      },
    });
    await sendRequest<IBackendRes<any>>({
      url: `/api/revalidate`,
      method: "POST",
      queryParams: {
        tag: "get-like-user-item",
      },
    });
    router.refresh();
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip
            onClick={() => {
              handleLikeItem();
            }}
            sx={{ borderRadius: "5px" }}
            size="medium"
            icon={<FavoriteIcon />}
            color={resLike?.some((t) => t.user_id === user_id) ? "error" : "default"}
            label="like"
            //   color="success"
            variant="outlined"
          />
        </Stack>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div>
              <GradeIcon style={{ fontSize: "20px" }} />
            </div>
            <div>{data ? data : "chưa đánh giá"}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <FavoriteIcon style={{ fontSize: "20px" }} />
            </div>
            <div>{resLike.length ? resLike.length : 0}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LikeItem;
