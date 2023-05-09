import { withAuth } from "../../src/components/commons/hocs/withAuth";
import Mypage from "../../src/components/units/mypage/Mypage.container";

function MyProfilePage() {

  return (
    <Mypage />
  );
}

export default withAuth(MyProfilePage);