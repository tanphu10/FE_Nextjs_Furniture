import { sendRequest } from "@/src/utils/api";
import * as React from "react";
import { Container } from "@mui/material";
import EditOrder from "@/src/components/orders/edit.order";

const editorder = async (props: any) => {
  const { params } = props;
  const id = +params.slug;
  // console.log(id);
  const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/user/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-booked-edit-item"] },
    },
  });
  return (
    <Container>
      <EditOrder arrItem={res?.data?.content} />
    </Container>
  );
};

export default editorder;
