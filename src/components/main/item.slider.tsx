import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
interface IProps {
  data: Iitems;
}
const ItemMain = (props: IProps) => {
  let { data } = props;
  //   console.log("items check>>>> ", items);
  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "10px 0" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${data.photo}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name_item}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            style={{
              textDecoration: "unset",
            }}
            href={`/detail/${data.name_item}-${data.id}.html`}
          >
            Detail
          </Link>
        </CardActions>
      </Card>
    </>
  );
};
export default ItemMain;
