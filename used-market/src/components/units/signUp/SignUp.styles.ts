import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1080px;
  height: calc(100vh - 180px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputWrap = styled.div`
  box-shadow: 0 0 2px #5729ff;
  width: 450px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignUpTitle = styled.h2`
  margin-bottom: 4em;
  font-size: 1.5em;
  color: #5729ff;
`;

export const SignUpInputWrap = styled.div`
  margin-bottom: 1em;
`;

export const SignUpInput = styled.input`
  width: 300px;
  height: 60px;
  &:focus {
    outline: 0;
  }
`;

export const InputErrorMsg = styled.div`
  font-size: 12px;
  color: red;
`;

export const SignUpButton = styled.button`
  width: 300px;
  height: 60px;
  background-color: #5729ff;
  border: none;
  color: #fff;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #5212ff;
  }
`;
