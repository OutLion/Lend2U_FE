import React from 'react';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import {
  CardContainer,
  UpWrapper,
  CardInfo,
  Title,
  SubTitle,
  StatusButton,
  BorderLine,
  InsideWrapper,
  DeleteButton,
  UpdateButton,
  UnderWrapper
} from '../../component/applicationDetail/CardStyle';
const ApplicationCard = ({
  apply_id,
  name,
  phoneNum,
  device,
  applicationReason,
  email,
  certificationFile,
  detailAddress,
  roadAddress,
  applyDate,
  returnDate,
  depositorName,
  applicationStatus,
  refuseReason,
  waybillNumber,
  courier,
  bank,
  deposit
}: ApplicationDetailProps) => {
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Title>신청일</Title>
          <SubTitle>{applyDate}</SubTitle>
        </CardInfo>
        <BorderLine> </BorderLine>
        <CardInfo>
          <Title>주소</Title>
          <SubTitle>
            {roadAddress} {detailAddress}
          </SubTitle>
        </CardInfo>
        <BorderLine> </BorderLine>
        <CardInfo>
          <Title>입금자명/입금계좌</Title>
          <SubTitle>
            {depositorName} / 농협 333-123456-7891((주)아웃라이언)
          </SubTitle>
        </CardInfo>
        <BorderLine></BorderLine>
        <CardInfo>
          <Title>반납일</Title>
          {returnDate != '' && <SubTitle>{returnDate}</SubTitle>}
          {returnDate == '' && <SubTitle>배송완료 후 확정</SubTitle>}
        </CardInfo>
      </UpWrapper>
      <UnderWrapper>
        <StatusButton>{applicationStatus}</StatusButton>
        <InsideWrapper>
          <DeleteButton>취소</DeleteButton>
          <UpdateButton>수정</UpdateButton>
        </InsideWrapper>
      </UnderWrapper>
    </CardContainer>
  );
};

export default ApplicationCard;
