import DetailItem from "@/src/components/items/detail.item";
import { sendRequest } from "@/src/utils/api";
import { useSearchParams } from "next/navigation";

const detailItem = async (props: any) => {
  //   const searchParams = useSearchParams();
  //   const check = searchParams.get("id");
  //   console.log("check data get=>>", check);
  const { params } = props;
  const res1 = params.slug.split(".html");
  const res2 = res1[0]?.split("-");
  const id = res2[res1.length - 1];
  //   console.log("check id=>>>", res1);
  const res = await sendRequest<IBackendRes<IModelPaginate<Iitems>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/${id}`,
    method: "GET",
  });
  //   console.log("check data trả về", res.data);
  //   let item = res?.data?.content || null;
  const resLike = await sendRequest<IBackendRes<IModelPaginate<ILike[]>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/like/${id}`,
    method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${session?.access_token}`,
    //   },
    nextOption: {
      next: { tags: ["get-by-like-id"] },
    },
  });
  const resCmt = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-by-cmt-id"] },
    },
  });
  //   console.log(res)
//   console.log("check data like", resCmt.data?.content);
  return (
    <>
      <DetailItem
        item={res.data?.content || null}
        resLike={resLike.data?.content || []}
        resCmt={resCmt.data?.content || []}
      />
    </>
  );
};

export default detailItem;
