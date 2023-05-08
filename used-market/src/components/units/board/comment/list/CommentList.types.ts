import { IQuery } from "../../../../../commons/types/generated/types";
import { IBoardComment } from "../../../../../commons/types/generated/types";

export interface ICommentListUIProps {
  data?: Pick<IQuery, "fetchBoardComments">;
}

export interface ICommentListItemProps {
  el: IBoardComment;
}
