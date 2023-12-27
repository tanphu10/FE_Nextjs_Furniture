"use client";
import { sendRequest } from "@/src/utils/api";
import { Container, TextField } from "@mui/material";
import Box from "next-auth/providers/box";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";

interface IProps {
  resCmt: ICmt[];
  item: any;
}
const CommentItem = (props: IProps) => {
  const { data: session } = useSession();
  const [yourComment, setYourComment] = useState("");
  let user = session?.user;
  let { resCmt, item } = props;
  //   console.log("check yourComment ==>>>", yourComment);
  const router = useRouter();
  const handleSubmit = async () => {
    const bl = await sendRequest<IBackendRes<IModelPaginate<ICmt>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment`,
      method: "POST",
      body: {
        item_id: item.id,
        user_id: user?.id,
        date_on: new Date(),
        content: yourComment,
        rate: 5,
      },
    });
    // console.log(bl.data?.content);
    await sendRequest<IBackendRes<any>>({
      url: "/api/revalidate",
      method: "POST",
      queryParams: {
        tag: "get-by-cmt-id",
      },
    });
    if (bl?.data) {
      setYourComment("");
      router.refresh();
    }
  };
  return (
    <Container>
      <div>
        {session?.user && (
          <div
            // component="form"
            // sx={{
            //   "& > :not(style)": { width: "100%", maxWidth: "100%" },
            // }}
            // noValidate
            //   autoComplete="off"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              style={{ width: "90%" }}
              value={yourComment}
              onChange={(e) => {
                setYourComment(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              label="comment"
              variant="standard"
            />
            <button
              style={{ width: "10%" }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: "20px" }}>
        {/* <div style={{ marginLeft: "10px", width: "25%" }}>
          <img
            style={{ width: "150px", height: "150px" }}
            //   src={fetchDefaultImages(track?.uploader?.type!)}
            alt=""
          />
          {track?.uploader?.email && (
            <p style={{ marginLeft: "10px" }}>{track?.uploader?.email}</p>
          )}
        </div> */}
        <div style={{ width: "75%" }}>
          {resCmt?.map((comment) => {
            // console.log("check comment>>>", comment);
            return (
              <div
                key={comment.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "25px",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/img/${comment?.users?.avatar}`}
                  />
                  <div>
                    <div style={{ fontSize: "13px" }}>
                      {comment?.users?.full_name}
                    </div>
                    <div>Bình luận : {comment.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default CommentItem;
