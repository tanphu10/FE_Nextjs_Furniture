import { Container } from "@mui/material";
import AppHeader from "../components/header/app.header";
import MainSlider from "../components/main/main.slider";
import { sendRequest } from "@/src/utils/api";
import ItemMain from "../components/main/item.slider";

export default async function Home() {
  const res_type = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/type-item`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-type-item"] },
    },
  });
  const res_item = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-by-item"] },
    },
  });
  let data = res_type?.data.content;
  let items = res_item?.data.content;
  // console.log(items);
  return (
    <Container>
      <MainSlider data={data} items={items} />
    </Container>
  );
}
