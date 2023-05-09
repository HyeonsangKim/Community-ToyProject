import { EditOutlined, LogoutOutlined, RedoOutlined } from "@ant-design/icons";
import * as S from "./Mypage.styles";
import { IMypageUIProps } from "./Mypage.types";
import { Modal } from "antd";

export default function MypageUI(props: IMypageUIProps) {

  return (
    <>
      {props.isModalToggle &&
        <Modal open={true} onCancel={props.onClickModalToggle} onOk={props.onClickUserUpdate}>
          <S.UpdateUserWrapper>
            <h2>회원정보수정</h2>
            <S.ModalImageWrapper>
              {props.picture ? (
                <S.ImageBox>
                  <S.Image 
                    onClick={props.onClickUpload} 
                    src={`https://storage.googleapis.com/${props.picture}`} 
                  />
                </S.ImageBox>
              ) : (
                <S.ImageBox>
                  <S.Image 
                    onClick={props.onClickUpload} 
                    src={props.data?.fetchUserLoggedIn.picture ? `https://storage.googleapis.com/${props.data?.fetchUserLoggedIn.picture}` : "/images/avatar.png" } 
                  />
                </S.ImageBox>
              )}
              <S.InvisibleFileInput>
                <input type="file" onChange={props.onChangePicture} ref={props.fileRef}  />
              </S.InvisibleFileInput>
            </S.ModalImageWrapper>
            <S.ModalInputWrapper>
              <S.ModalInputName>이름</S.ModalInputName> <br />
              <S.ModalInput 
                type="text" 
                placeholder="새로운 이름을 입력하세요" 
                value={props.name || (props.data?.fetchUserLoggedIn.name ?? '')} 
                onChange={props.onChangeName} 
              />
            </S.ModalInputWrapper>
          </S.UpdateUserWrapper>
        </Modal>
      }
      {props.isPwModalToggle &&
        <Modal open={true} onCancel={props.onClickPasswordModalToggle} onOk={props.onClickResetPassword}>
          <S.UpdateUserWrapper>
            <h2>비밀번호 변경</h2>
            <S.ModalInputWrapper>
              <S.ModalInput 
                type="password" 
                placeholder="비밀번호를 입력해주세요" 
                onChange={props.onChangePassword}
              />
            </S.ModalInputWrapper>
            <S.ModalInputWrapper>
              <S.ModalInput 
                type="password" 
                placeholder="비밀번호를 다시 입력해주세요"
                onChange={props.onChangeRePassword}
              />
            </S.ModalInputWrapper>
          </S.UpdateUserWrapper>
        </Modal>
      }
      <S.Wrapper>
        <S.Title>마이페이지</S.Title>
        <S.ImageWrapper>
          {props.data?.fetchUserLoggedIn.picture ? (
            <S.ImageBox>
              <S.Image 
                src={`https://storage.googleapis.com/${props.data?.fetchUserLoggedIn.picture}`} 
              />
            </S.ImageBox>
          ) : (
            <S.ImageBox>
              <S.Image 
                src="/images/avatar.png" 
              />
            </S.ImageBox>
          )}
          <S.Name>{props.data?.fetchUserLoggedIn?.name}님</S.Name>
        </S.ImageWrapper>
        <S.OptionArea>
          <S.ButtonWrapper>
            <EditOutlined />
            <S.Button onClick={props.onClickModalToggle}>회원정보수정</S.Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <RedoOutlined />
            <S.Button onClick={props.onClickPasswordModalToggle}>비밀번호 변경</S.Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <LogoutOutlined />
            <S.Button onClick={props.onClickLogout}>로그아웃</S.Button>
          </S.ButtonWrapper>
        </S.OptionArea>
      </S.Wrapper>
    </>
  );
}