import { useMutation, useQuery } from "@apollo/client";
import MypageUI from "./Mypage.presenter";
import { FETCH_USER_LOGGED_IN, LOGOUT_USER, RESET_USER_PASSWORD, UPDATE_USER, UPLOAD_FILE } from "./Mypage.queries";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";
import { IMutation, IMutationUpdateUserArgs, IMutationUploadFileArgs, IQuery } from "../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IupdateUserInput } from "./Mypage.types";
import { checkValidationImage } from "../../commons/uploads/01/Uploads01.validation";
import { Result } from "antd";

export default function Mypage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isModalToggle, setIsModalToggle] = useState(false);
  const [isPwModalToggle, setIsPwModalToggle] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);
  const [updateUser] = useMutation<Pick<IMutation, 'updateUser'>, IMutationUpdateUserArgs>(UPDATE_USER);
  const [logoutUser] = useMutation<Pick<IMutation, 'logoutUser'>>(LOGOUT_USER);
  const [resetUserPassword] = useMutation<Pick<IMutation, 'resetUserPassword'>>(RESET_USER_PASSWORD);

  const onClickModalToggle = () => {
    setIsModalToggle((prev) => !prev);
  }

  const onClickPasswordModalToggle = () => {
    setIsPwModalToggle((prev) => !prev);
  }

  const onClickUpload = () => {
    fileRef.current?.click();
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  const onChangePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(e.currentTarget.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({
        variables: { file }
      });
      if (typeof result.data?.uploadFile.url !== 'string') return;
      setPicture(result.data?.uploadFile.url);
    } catch(error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const onChangeRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.currentTarget.value);
  }

  const onClickLogout = async () => {
    try {
      const result = await logoutUser();
      console.log(result);
      const isLogout = result.data?.logoutUser;
      if (isLogout) {
        setAccessToken('');
        void router.push('/boards');
      }
    } catch(error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  const onClickUserUpdate = async () => {
    const currentPicture = picture;
    const defaultPicture = data?.fetchUserLoggedIn.picture;
    const isChangedPicture = currentPicture !== defaultPicture;
    const isNotChangedPicture = (currentPicture === '' && defaultPicture);

    if (!name && !picture) {
      alert('수정된 내용이 없습니다.');
      return;
    }

    const updateUserInput: IupdateUserInput = {};
    if(name) updateUserInput.name = name;
    if(isChangedPicture) updateUserInput.picture = currentPicture;
    if(isNotChangedPicture) updateUserInput.picture = defaultPicture;

    try {
      const result = await updateUser({
        variables: {
          updateUserInput
        }
      });
      console.log(result);
      alert('회원정보가 수정되었습니다.');
      setIsModalToggle(false);
    } catch(error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  const onClickResetPassword = async () => {
    if (password.length < 4 && rePassword.length < 4) {
      alert('비밀번호는 최소 4자리 이상 입력해주세요.');
      return <></>;
    }
    if (password !== rePassword) {
      alert('비밀번호가 다릅니다.');
      return <></>;
    }

    try {
      await resetUserPassword({
        variables: { password }
      });
      alert('비밀번호가 변경되었습니다.');
      setIsPwModalToggle(false);
    } catch(error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  return (
    <MypageUI
      data={data}
      name={name}
      picture={picture}
      fileRef={fileRef}
      isModalToggle={isModalToggle}
      isPwModalToggle={isPwModalToggle}
      onClickModalToggle={onClickModalToggle}
      onClickPasswordModalToggle={onClickPasswordModalToggle}
      onClickUpload={onClickUpload}
      onChangeName={onChangeName}
      onChangePicture={onChangePicture}
      onChangePassword={onChangePassword}
      onChangeRePassword={onChangeRePassword}
      onClickLogout={onClickLogout}
      onClickUserUpdate={onClickUserUpdate}
      onClickResetPassword={onClickResetPassword}
    />
  );
}