import { ChangeEvent, useState } from "react";
import SignUpPageUI from "./SignUp.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpType } from "./SignUp.types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../commons/types/generated/types";
import { CREATE_USER } from "./SignUp.queries";
import { useRouter } from "next/router";
import { Modal } from "antd";

export default function SignUpPage() {
  const schema = yup.object({
    email: yup
      .string()
      .email("이메일 형식에 적합하지 않습니다.")
      .required("이메일은 필수 입력 사항입니다."),
    password: yup
      .string()
      .min(4, "비밀번호는 최소 4자리 이상 입력해주세요.")
      .max(15, "비밀번호는 최대 15자리까지 입력해주세요.")
      .required("비밀번호는 필수 입력 사항입니다."),
    name: yup.string().required("이름을 입력하세요."),
  });

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const router = useRouter();

  const [signUp] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const [error, setError] = useState("");

  const { register, handleSubmit, formState } = useForm<ISignUpType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeRePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value);
  };

  const onSubmit = async (data: ISignUpType) => {
    if (password !== rePassword) {
      alert("비밀번호가 다릅니다.");
      return <></>;
    }

    try {
      const result = await signUp({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <SignUpPageUI
      onSubmit={onSubmit}
      onChangePassword={onChangePassword}
      onChangeRePassword={onChangeRePassword}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
    />
  );
}
