import styled from "@emotion/styled";

const Body = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
`;

export default function Home() {

  return (
    <Body>
      <div>다양한 사람들과 소통할 수 있는 오픈 소셜 게시판입니다.</div>
    </Body>
  );
}
