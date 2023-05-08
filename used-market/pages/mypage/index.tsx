import { withAuth } from "../../src/components/commons/hocs/withAuth";

function MyProfilePage() {

  return (
    <>
      마이페이지
    </>
  );
}

export default withAuth(MyProfilePage);