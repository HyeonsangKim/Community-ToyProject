import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IBoardComment } from "../../../../../commons/types/generated/types";

export interface ICommentWriteProps {
  isEdit?: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>
  el?: IBoardComment;
}

export interface IUpdateBoardCommentInput {
  contents?: string;
  rating?: number;
}

export interface ICommentWriteUIProps {
  onClickUpdate: () => void;
  onClickSubmit: () => void;
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  writer: string;
  password: string;
  contents: string;
  isEdit?: boolean;
  el?: IBoardComment;
}