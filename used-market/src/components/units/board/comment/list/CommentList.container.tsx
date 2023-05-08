import { gql, useQuery } from "@apollo/client";
import CommentListUI from "./CommentList.presenter";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "./CommentList.queries";

export default function CommentList() {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") {
    alert("올바르지 않은 게시글 아이디입니다.");
    void router.push("/");
    return <></>;
  }

  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: router.query.boardId,
    },
  });

  return <CommentListUI data={data} />;
}
