import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { accessTokenState, restoreAccessTokenLoadable } from "../../../commons/store";
import { useEffect } from "react";
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from "../../../commons/libraries/getAccessToken";


const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const newAccessTokenLoadable =  useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 새로고침시 토큰 유지
  useEffect(() => {
    void newAccessTokenLoadable.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? '');
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러 캐치
    if (typeof graphQLErrors !== 'undefined') {
      for(const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
          // 2. refreshToken으로 accessToken 재발급 (재사용하기 위해 컴포넌트로 분리, getAccessToken())
          getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? '');
              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: Bearer asdaggwafaw => 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}` // 3-2. 토큰만 새걸로 바꿔치기
                }
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 방금 수정한 쿼리 재요청
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: 'https://backendonline.codebootcamp.co.kr/graphql',
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include'
  });

  const client = new ApolloClient({
    link: ApolloLink.from([ errorLink, uploadLink ]),
    cache: GLOBAL_STATE,
    connectToDevTools: true,
  });

  return (
      <ApolloProvider client={client}>
        {props.children}
      </ApolloProvider>
    );
}
