import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/store";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IMutation, IQuery } from "../../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN, LOGOUT_USER } from "./LayoutHeader.queries";

export default function LayoutHeader() {
  const router = useRouter();
  const [logoutUser] = useMutation<Pick<IMutation, "logoutUser">>(LOGOUT_USER);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogo = () => {
    void router.push("/boards");
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

  const onClickMoveToMypage = () => {
    void router.push("/mypage");
  };
  return (
    <LayoutHeaderUI
      data={data}
      onClickLogo={onClickLogo}
      onClickLogin={onClickLogin}
      onClickLogout={onClickLogout}
      onClickSignUp={onClickSignUp}
      onClickMoveToMypage={onClickMoveToMypage}
      accessToken={accessToken}
    />
  );
}
