"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Container, Grid } from "@mui/material";
import Link from "next/link";
import { sendRequest } from "@/src/utils/api";
const SearchItem = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("s");
  console.log(value);
  const [items, setItems] = useState<Iitems[]>([]);
  const fetchSearch = async () => {
    const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/search/${value}`,
      method: "GET",
    });
    // console.log(res);
    setItems(res.data?.content);
  };

  useEffect(() => {
    document.title = `${value}`;
    if (value) {
      fetchSearch();
    }
  }, [value]);
  return (
    <Container style={{ margin: "100px 0" }}>
      {" "}
      <div>
        <span>kết quả tìm kiếm từ khóa : {value}</span>
      </div>
      <hr />
      {items ? (
        items?.map((item) => {
          return (
            <div style={{ margin: "20px 0 " }} key={item.id}>
              <Link href={`/detail/${item.name_item}-${item.id}.html`}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    textDecoration: "unset",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        style={{
                          color: "unset",
                          textDecoration: "unset",
                        }}
                        component="div"
                        variant="h5"
                      >
                        {item.name_item}
                      </Typography>
                      <Typography
                        style={{
                          color: "unset",
                          textDecoration: "unset",
                        }}
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item.photo}`}
                    alt="Live from space album cover"
                  />
                </Card>
              </Link>
            </div>
          );
        })
      ) : (
        <div>không tồn tại kết quả tìm kiếm</div>
      )}
    </Container>
  );
};
export default SearchItem;
