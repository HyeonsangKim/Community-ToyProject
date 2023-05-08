import * as S from "./Login.styles";
import { ILoginFormData } from "./Login.types";

interface ILoginUIProps {
  onClickSubmit: (data: ILoginFormData) => void;
  register: any;
  handleSubmit: any;
  formState: any;
}

export default function LoginUI(props: ILoginUIProps) {

  return (
    <S.Wrapper>
      <S.InputWrap>
        <S.LoginTitle>LOGIN</S.LoginTitle>
        <form onSubmit={props.handleSubmit(props.onClickSubmit)}>
          <S.LoignInputWrap>
            <S.LoginInput type="email" placeholder="이메일을 입력해주세요" {...props.register('email')} />
            <S.InputErrorMsg>{props.formState.errors.email?.message}</S.InputErrorMsg>
          </S.LoignInputWrap>
          <S.LoignInputWrap>
            <S.LoginInput type="password" placeholder="비밀번호를 입력해주세요" {...props.register('password')} />
            <S.InputErrorMsg>{props.formState.errors.password?.message}</S.InputErrorMsg>
          </S.LoignInputWrap>
          <S.LoginButton>로그인하기</S.LoginButton>
        </form>
      </S.InputWrap>
    </S.Wrapper>
  );
}