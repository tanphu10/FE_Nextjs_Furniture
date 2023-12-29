import { IUser } from "@/src/types/next-auth";

interface IProps {
  user: IUser;
}
const MyProfile = (props: IProps) => {
  const { user } = props;
  console.log(user);

  return <>ddd</>;
};

export default MyProfile;
