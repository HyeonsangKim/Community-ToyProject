import CommentListItem from "./CommentList.presenteritem";
import { ICommentListUIProps } from "./CommentList.types";

export default function CommentListUI(props: ICommentListUIProps) {
  return (
    <>
      {props.data?.fetchBoardComments.map((el) => (
        <CommentListItem key={el._id} el={el} />
      ))}
    </>
  );
}
