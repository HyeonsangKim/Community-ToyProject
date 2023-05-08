import CommentList from "../../../src/components/units/board/comment/list/CommentList.container";
import CommentWrite from "../../../src/components/units/board/comment/write/CommentWrite.container";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container";

export default function BoardDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
