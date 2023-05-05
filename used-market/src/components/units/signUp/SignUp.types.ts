import { ChangeEvent } from "react";

export interface ISignUpType {
  email: string;
  password: string;
  name: string;
}

export interface ISignUpUIProps {
  onSubmit: (data: ISignUpType) => void;
  onChangePassword: (event: ChangeEvent<HTMLElement>) => void;
  onChangeRePassword: (event: ChangeEvent<HTMLElement>) => void;
  register: any;
  handleSubmit: any;
  formState: any;
}
