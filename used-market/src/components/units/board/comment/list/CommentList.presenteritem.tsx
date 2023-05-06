import { ChangeEvent, useState } from "react";
import { getDate } from "../../../../../commons/libraries/utils";
import * as S from "./CommentList.styles";
import { ICommentListItemProps } from "./CommentList.types";
import { useMutation } from "@apollo/client";
import { DELETE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./CommentList.queries";
import { IMutation, IMutationDeleteBoardCommentArgs } from "../../../../../commons/types/generated/types";
import { PasswordModal } from "./CommentList.styles";
import { PasswordInput } from "./CommentList.styles";
import { useRouter } from "next/router";
import CommentWrite from "../write/CommentWrite.container";

export default function CommentListItem(props: ICommentListItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPassword, setMyPassword] = useState('');

  const router = useRouter();
  const [deleteBoardComment] = useMutation<Pick<IMutation, 'deleteBoardComment'>, IMutationDeleteBoardCommentArgs>(DELETE_BOARD_COMMENT);

  const onChangeMyPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(e.currentTarget.value);
  }

  const onClickUpdate = () => {
    setIsEdit((prev) => !prev);
  }

  const onClickToggleDeleteModal = () => {
    setIsModalOpen((prev) => !prev);
  }

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: props.el._id
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId }
          }
        ]
      });
      onClickToggleDeleteModal();
    } catch(error) {
      if(error instanceof Error) alert(error.message);
    }
  }

  return (
    <>
      {isModalOpen &&
        <PasswordModal open={true} onOk={onClickDelete} onCancel={onClickToggleDeleteModal}>
          <div>비밀번호 입력: </div>
          <PasswordInput onChange={onChangeMyPassword} />
        </PasswordModal>
      }
      {!isEdit && (
        <S.ItemWrapper>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{props.el.writer}</S.Writer>
                <S.Star value={props.el.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{props.el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onClickUpdate}
              />
              <S.DeleteIcon
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onClickToggleDeleteModal}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(props.el.createdAt)}</S.DateString>
        </S.ItemWrapper>
        )
      }
      {isEdit &&
        <CommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      }
    </>
  );
}