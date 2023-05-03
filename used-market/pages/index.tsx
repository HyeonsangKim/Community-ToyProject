import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../src/commons/types/generated/types";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../src/commons/store";
import { cli } from "cypress";

const Body = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
`;

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function Home() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);

  return (
    <Body>
      {accessToken ? <div>{data?.fetchUserLoggedIn.name}님 환영합니다.</div> : <div>로그인 후 이용 가능합니다.</div>}
    </Body>
  );
}
