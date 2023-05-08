import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import CommentWriteUI from "./CommentWrite.presenter";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
} from "../../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./CommentWrite.queries";
import { FETCH_BOARD_COMMENTS } from "../list/CommentList.queries";
import {
  ICommentWriteProps,
  IUpdateBoardCommentInput,
} from "./CommentWrite.types";

export default function CommentWrite(props: ICommentWriteProps) {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value);
  };

  const onClickCancel = () => {
    props.setIsEdit((prev) => !prev);
  };

  // 댓글 등록
  const onClickSubmit = async () => {
    if (typeof router.query.boardId !== "string") return;

    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: router.query.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setWriter("");
      setPassword("");
      setContents("");
      setStar(0);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 댓글 수정
  const onClickUpdate = async () => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents;
      if (star !== props.el?.rating) updateBoardCommentInput.rating = star;

      if (typeof props.el?._id !== "string") return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      props.setIsEdit(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <CommentWriteUI
      onClickUpdate={onClickUpdate}
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickCancel={onClickCancel}
      star={star}
      setStar={setStar}
      writer={writer}
      password={password}
      contents={contents}
      isEdit={props.isEdit}
      el={props.el}
    />
  );
}
