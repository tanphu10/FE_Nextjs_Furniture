import MyProfile from "@/src/components/myProfile/my.profile";
import { sendRequest } from "@/src/utils/api";

const Profile = async (props: any) => {
  const { params } = props;
  const id = +params.slug;
  const res = await sendRequest<IBackendRes<IModelPaginate<any>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["get-user-by-id"] },
    },
  });
  console.log(res);
  let user = res.data?.content;
  return (
    <>
      <MyProfile user={user} />
    </>
  );
};

export default Profile;
