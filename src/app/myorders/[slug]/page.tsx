import { sendRequest } from "@/src/utils/api";
import * as React from "react";
import { Container } from "@mui/material";
import OrdersUser from "@/src/components/orders/orders.user";

const myorders = async (props: any) => {
  const { params } = props;
  const id = +params.slug;
  // console.log(id);
  const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-booked-item"] },
    },
  });
  return (
    <Container>
      <OrdersUser arrItem={res?.data?.content} />
    </Container>
  );
};

export default myorders;
