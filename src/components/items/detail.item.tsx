import CommentItem from "./cmt.item";
import LikeItem from "./like.item";

interface IProps {
  item: any;
  resLike: ILike[];
  resCmt: ICmt[];
  // id: number;
}
const DetailItem = (props: IProps) => {
  console.log(props.resLike);
  let { item, resLike, resCmt } = props;
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 15,
          padding: 20,
          height: 400,
          background:
            "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            padding: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          {item?.photo ? (
            <img
              style={{
                width: 500,
                height: 400,
              }}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${item?.photo}`}
            />
          ) : (
            <div
              style={{
                background: "#ccc",
                width: 250,
                height: 250,
              }}
            ></div>
          )}
        </div>
        <div
          className="right"
          style={{
            width: "25%",
            height: "calc(100% - 10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="info" style={{ display: "flex" }}>
            <div style={{ marginLeft: 20 }}>
              <div
                style={{
                  padding: "0 5px",
                  background: "#333",
                  fontSize: 30,
                  width: "fit-content",
                  color: "white",
                }}
              >
                {item?.name_item}
              </div>
              <div
                style={{
                  padding: "0 5px",
                  marginTop: 10,
                  background: "#333",
                  fontSize: 20,
                  width: "fit-content",
                  color: "white",
                }}
              >
                {item?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LikeItem resLike={resLike} resCmt={resCmt} item={item} />
      </div>
      <div>
        <CommentItem resCmt={resCmt || []} item={item} />
      </div>
    </div>
  );
};

export default DetailItem;
