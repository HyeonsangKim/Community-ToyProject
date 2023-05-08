import { Button } from "antd";
import * as S from "./CommentWrite.styles";
import { ICommentWriteUIProps } from "./CommentWrite.types";

export default function CommentWriteUI(props: ICommentWriteUIProps) {

  return (
    <S.Wrapper>
      {!props.isEdit && (
        <S.TitleWrapper>
          <S.PencilImg src="/images/boardComment/write/pencil.png" />
          <S.Title>댓글</S.Title>
        </S.TitleWrapper>
      )}
      <S.InputWrapper>
        <S.Input value={props.writer || (props.el?.writer ?? '')} type="text" placeholder="작성자" onChange={props.onChangeWriter} readOnly={!!props.el?.writer} />
        <S.Input value={props.password} type="password" placeholder="비밀번호" onChange={props.onChangePassword} />
        <S.Star value={props.star || (props.el?.rating ?? 0)} onChange={props.setStar} />
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents value={props.contents || (props.el?.contents ?? '')} maxLength={100} placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." onChange={props.onChangeContents} />
        <S.BottomWrapper>
          <S.ContentsLength>{(props.contents ? props.contents.length : props.el?.contents.length) ?? 0}/100</S.ContentsLength>
          <S.Button onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>{props.isEdit ? '수정하기' : '등록하기'}</S.Button>
          {props.isEdit && <S.Button onClick={props.onClickCancel}>취소하기</S.Button>}
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}