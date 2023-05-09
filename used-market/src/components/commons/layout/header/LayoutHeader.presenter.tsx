import {
  Image,
  ImageWrapper,
  InnerButton,
  InnerLogo,
  InnerWrapper,
  MenuIcon,
  Wrapper,
} from "./LayoutHeader.styles";
import { ILayoutHeaderProps } from "./LayoutHeader.types";
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

export default function LayoutHeaderUI(props: ILayoutHeaderProps) {

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{display: "flex", alignItems: "center"}}>
          <ImageWrapper>
            <Image src={`https://storage.googleapis.com/${props.data?.fetchUserLoggedIn.picture}`} />
          </ImageWrapper>
          <div style={{marginLeft: "0.4em"}}>{props.data?.fetchUserLoggedIn.name}님</div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <a 
          target="_blank" 
          style={{color: "#000"}}
          onClick={props.onClickMoveToMypage}
        >
          마이페이지
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '3',
      label: (
        <InnerButton
            onClick={
              !props.accessToken ? props.onClickLogin : props.onClickLogout
            }
            style={{color: "#000"}}
          >
            {!props.accessToken ? "로그인" : "로그아웃"}
        </InnerButton>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={props.onClickLogo}>Open Social</InnerLogo>
        <div>
          {!props.accessToken && (
            <InnerButton
              onClick={props.onClickLogin}
            >
              로그인
            </InnerButton>
          )}
          {!props.accessToken ? <InnerButton onClick={props.onClickSignUp}>회원가입</InnerButton> : ''}
          {props.accessToken &&
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <ImageWrapper>
                    <Image src={`https://storage.googleapis.com/${props.data?.fetchUserLoggedIn.picture}`} />
                  </ImageWrapper>
                  <MenuIcon />
                </Space>
              </a>
            </Dropdown>
          }
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
