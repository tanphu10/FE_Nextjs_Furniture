import AddCart from "@/src/components/addCart/add.cart";
import { sendRequest } from "@/src/utils/api";
import { Container } from "@mui/material";

const MyCart = async (props: any) => {
  const { params } = props;
  let id = +params.slug;
  const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-cart/user/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-cart-user-item"] },
    },
  });
  // console.log(res);
  const data = res.data?.content;
  return (
    <Container>
      <AddCart CartItem={data} />
    </Container>
  );
};
export default MyCart;
