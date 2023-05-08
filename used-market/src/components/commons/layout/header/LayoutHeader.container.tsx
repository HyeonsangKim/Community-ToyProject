import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/store";
import { gql, useMutation } from "@apollo/client";
import { IMutation } from "../../../../commons/types/generated/types";

const LOGOUT_USER = gql`
  mutation {
    logoutUser
  }
`;

export default function LayoutHeader() {
  const router = useRouter();
  const [logoutUser] = useMutation<Pick<IMutation, "logoutUser">>(LOGOUT_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogo = () => {
    void router.push("/");
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickLogout = async () => {
    const result = await logoutUser();
    console.log(result);
    const isLogout = result.data?.logoutUser;
    if (isLogout) {
      setAccessToken("");
      void router.push("/login");
    }
  };

  const onClickSignUp = () => {
    router.push("/signUp");
  };

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickLogin={onClickLogin}
      onClickLogout={onClickLogout}
      onClickSignUp={onClickSignUp}
      accessToken={accessToken}
    />
  );
}
