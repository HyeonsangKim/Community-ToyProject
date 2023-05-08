import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_BOARD } from "./BoardEdit.queires";
import BoardWrite from "../write/BoardWrite.container";

export default function BoardEdit() {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") {
    alert("올바르지 않은 게시글 아이디입니다");
    void router.push("/");
    return <></>;
  }

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );

  return <BoardWrite isEdit={true} data={data} />;
}
