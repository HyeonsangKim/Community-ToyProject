import { ChangeEvent } from "react";

export interface ISignUpType {
  email: string;
  password: string;
  name: string;
}

export interface ISignUpUIProps {
  onSubmit: (data: ISignUpType) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  register: any;
  handleSubmit: any;
  formState: any;
}
