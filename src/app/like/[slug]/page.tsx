import MyLike from "@/src/components/likes/my.like";
import { sendRequest } from "@/src/utils/api";
import { Container } from "@mui/material";

const LikePage = async (props: any) => {
  const { params } = props;

  let id = +params.slug;
  // console.log("cccccccccid", id);
  const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/like/user/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-like-user-item"] },
    },
  });
  let like = res.data?.content;
  // console.log("chekc like ",res);
  return (
    <Container>
      <MyLike like={like} />
    </Container>
  );
};
export default LikePage;
