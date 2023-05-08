import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeader.styles";
import { ILayoutHeaderProps } from "./LayoutHeader.types";

export default function LayoutHeaderUI(props: ILayoutHeaderProps) {
  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={props.onClickLogo}>Used Market</InnerLogo>
        <div>
          <InnerButton
            onClick={
              !props.accessToken ? props.onClickLogin : props.onClickLogout
            }
          >
            {!props.accessToken ? "로그인" : "로그아웃"}
          </InnerButton>
          <InnerButton onClick={props.onClickSignUp}>회원가입</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
