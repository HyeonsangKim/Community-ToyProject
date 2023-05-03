import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 80px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LayoutFooter() {

  return (
    <Wrapper>
      designed by KIM & AHN
    </Wrapper>
  );
}