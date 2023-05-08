import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 500px;
  height: calc(100vh - 180px);
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  padding: 1em 0;
`;

export const ImageWrapper = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Image = styled.img`
  width: 15%;
  border-radius: 50%;
  cursor: pointer;
`;

export const Name = styled.span`
  margin-top: 1em;
  font-weight: bold;
`;

export const OptionArea = styled.div`
  /* height: 400px; */
  border-top: 2px solid lightgray;
  border-bottom: 2px solid lightgray;
`;

export const ButtonWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  padding: 0.4em 0;
`;

export const Button = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    text-decoration: underline;
  }
`;

export const UpdateUserWrapper = styled.div`
  height: 250px;
`;

export const ModalImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInputWrapper = styled.div`
  margin-top: 2.5em;
`;

export const ModalInputName = styled.span`
  font-weight: bold;
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 60px;
  &:focus {
    outline: 0;
  }
`;

export const InvisibleFileInput = styled.div`
  display: none;
`;