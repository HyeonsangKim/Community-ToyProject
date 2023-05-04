import { useRouter } from "next/router";
import { useEffect } from "react"
import { restoreAccessTokenLoadable } from "../../../commons/store";
import { useRecoilValueLoadable } from "recoil";
import { Modal } from "antd";

export const withAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const newAccessTokenLoadable =  useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    void newAccessTokenLoadable.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        Modal.error({ content: '로그인 후 이용 가능합니다.'});
        void router.push('/login');
      }
    });
  }, []);
  
  return <Component {...props} />
}