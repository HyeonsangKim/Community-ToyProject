import { ChangeEvent, RefObject } from "react";
import { IQuery } from "../../../commons/types/generated/types";

export interface IupdateUserInput {
  name?: string;
  picture?: string;
}

export interface IMypageUIProps {
  data?: Pick<IQuery, "fetchUserLoggedIn">;
  name: string;
  picture: string;
  fileRef: RefObject<HTMLInputElement>;
  isModalToggle: boolean;
  isPwModalToggle: boolean;
  onClickModalToggle: () => void;
  onClickPasswordModalToggle: () => void;
  onClickUpload: () => void;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePicture: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeRePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickLogout: () => void;
  onClickUserUpdate: () => void;
  onClickResetPassword: () => void;
}