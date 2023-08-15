import React, { useState } from 'react';
import { ApplicationDetailProps } from './ApplicationDetailProps';
import {
  UpWrapper,
  CardInfo,
  Title,
  SubTitle,
  BorderLine,
  StatusButton,
  RefuseButton,
  UnderWrapper,
  AdminCardContainer
} from './CardStyle';
import AdminRefuseModal from './AdminRefuseModal';

const ApplicationCardForAdmin = ({
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
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [controlModalOpen, setControlModalOpen] = useState(false);
  const [retrieveInfoModalOpen, setRetrieveInfoModalOpen] = useState(false);
  const isRejected = applicationStatus === '신청 반려';
  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const openControlModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeControlModal = () => {
    setIsRejectModalOpen(false);
  };
  const openInfoModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsRejectModalOpen(false);
  };
  const handleRejectSubmit = () => {
    // 모달 닫기
    closeRejectModal();
  };
  const handleCertificationDownload = () => {
    if (certificationFile) {
      // Assume certificationFile is the URL of the file
      window.open(certificationFile, '_blank');
    }
  };
  return (
    <AdminCardContainer>
      <UpWrapper>
        <CardInfo>
          <Title>이름 · 전화번호 · 신청기기</Title>
          <SubTitle>
            {name} · {phoneNum} · {device}
          </SubTitle>
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
          <Title>입금자명 · 이메일</Title>
          <SubTitle>
            {depositorName} · {email}
          </SubTitle>
        </CardInfo>
        <BorderLine></BorderLine>
        <CardInfo>
          <Title>신청사유</Title>
          <SubTitle>{applicationReason}</SubTitle>
        </CardInfo>
        <BorderLine></BorderLine>
        <CardInfo>
          <Title>내역 상태</Title>
          <SubTitle>{applicationStatus}</SubTitle>
        </CardInfo>
      </UpWrapper>
      <UnderWrapper>
        <RefuseButton disabled={isRejected}>내역 상태 변경</RefuseButton>
        <RefuseButton
          disabled={isRejected}
          onClick={handleCertificationDownload}>
          증명서 다운로드
        </RefuseButton>
        <RefuseButton
          disabled={isRejected}
          onClick={openRejectModal}
          style={{ background: isRejected ? '#FFA5A5' : '' }}>
          {isRejected ? '반려 확정' : '접수 내역 반려'}
        </RefuseButton>
        <RefuseButton disabled={isRejected}>반환 정보 조회</RefuseButton>
      </UnderWrapper>
      {isRejectModalOpen && (
        <AdminRefuseModal
          apply_id={apply_id}
          isOpen={isRejectModalOpen}
          onClose={closeRejectModal}
          onConfirm={handleRejectSubmit}
        />
      )}
    </AdminCardContainer>
  );
};

export default ApplicationCardForAdmin;
