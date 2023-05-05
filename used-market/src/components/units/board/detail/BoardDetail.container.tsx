import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IMutationDislikeBoardArgs,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import BoardDetailUI from "./BoardDetail.presenter";
import {
  DELETE_BOARD,
  DISLIKE_BOARD,
  FETCH_BOARD,
  LIKE_BOARD,
} from "./BoardDetail.queries";
import { MouseEvent } from "react";
import { FETCH_BOARDS } from "../list/BoardList.queries";

export default function BoardDetail() {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") {
    alert("올바르지 않은 게시글 아이디입니다.");
    void router.push("/");
    return <></>;
  }

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);
  const [dislikeBoard] = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );

  const onClickMoveToBoardList = () => {
    void router.push("/boards");
  };

  const onClickMoveToBoardEdit = () => {
    if (typeof router.query.boardId !== "string") {
      return;
    }

    void router.push(`/boards/${router.query.boardId}/edit`);
  };

  const onClickBoardDelete = async () => {
    if (typeof router.query.boardId !== "string") {
      return;
    }

    console.log(router.query.boardId);

    await deleteBoard({
      variables: {
        boardId: router.query.boardId,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });

    void router.push(`/boards/`);
  };

  const onClickLike = async () => {
    if (typeof router.query.boardId !== "string") return;
    await likeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  const onClickDislike = async () => {
    if (typeof router.query.boardId !== "string") return;
    await dislikeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickBoardDelete={onClickBoardDelete}
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
    />
  );
}
