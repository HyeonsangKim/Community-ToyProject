import * as S from "./SignUp.styles";
import { ISignUpUIProps } from "./SignUp.types";

export default function SignUpPageUI(props: ISignUpUIProps) {
  return (
    <S.Wrapper>
      <S.InputWrap>
        <S.SignUpTitle>SignUp</S.SignUpTitle>
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
          <S.SignUpInputWrap>
            <S.SignUpInput
              type='email'
              placeholder='이메일을 입력해주세요'
              {...props.register("email")}
            />
            <S.InputErrorMsg>
              {props.formState.errors.email?.message}
            </S.InputErrorMsg>
          </S.SignUpInputWrap>
          <S.SignUpInputWrap>
            <S.SignUpInput
              type='password'
              placeholder='비밀번호를 입력해주세요'
              {...props.register("password")}
              onChange={props.onChangePassword}
            />
            <S.InputErrorMsg>
              {props.formState.errors.password?.message}
            </S.InputErrorMsg>
          </S.SignUpInputWrap>
          <S.SignUpInputWrap>
            <S.SignUpInput
              type='password'
              placeholder='비밀번호를 다시 입력해주세요'
              onChange={props.onChangeRePassword}
            />
          </S.SignUpInputWrap>
          <S.SignUpInputWrap>
            <S.SignUpInput
              type='text'
              placeholder='이름을 입력해주세요'
              {...props.register("name")}
            />
            <S.InputErrorMsg>
              {props.formState.errors.name?.message}
            </S.InputErrorMsg>
          </S.SignUpInputWrap>
          <S.SignUpButton>회원가입 하기</S.SignUpButton>
        </form>
      </S.InputWrap>
    </S.Wrapper>
  );
}
