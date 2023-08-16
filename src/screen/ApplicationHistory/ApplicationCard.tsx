import React, { useState } from 'react';
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
import AdminRefuseModal from '../../component/applicationDetail/AdminRefuseModal';
import ControlStatusModal from '../../component/applicationDetail/ControlStatusModal';
import InfoModal from '../../component/applicationDetail/InfoModal';
import DeleteModal from '../../component/applicationDetail/DeleteModal';
import StatusModal from '../../component/applicationDetail/StatusModal';
import UpdateModal from '../../component/applicationDetail/UpdateModal';
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
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [StatusModalOpen, setStatusModalOpen] = useState(false);
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const Apply = applicationStatus === '반환 신청';
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const openStatusModal = () => {
    setStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setStatusModalOpen(false);
  };
  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };
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
          {returnDate == '' && <SubTitle>배송완료 후 자동 확정</SubTitle>}
        </CardInfo>
      </UpWrapper>
      <UnderWrapper>
        <StatusButton disabled={!Apply} onClick={openStatusModal}>
          {applicationStatus}
        </StatusButton>
        <InsideWrapper>
          <DeleteButton onClick={openDeleteModal}>취소</DeleteButton>
          <UpdateButton onClick={openUpdateModal}>수정</UpdateButton>
        </InsideWrapper>
      </UnderWrapper>
      {DeleteModalOpen && (
        <DeleteModal apply_id={apply_id} onClose={closeDeleteModal} />
      )}
      {StatusModalOpen && (
        <StatusModal apply_id={apply_id} onClose={closeStatusModal} />
      )}
      {UpdateModalOpen && (
        <UpdateModal
          apply_id={apply_id}
          name={name}
          phoneNum={phoneNum}
          device={device}
          applicationReason={applicationReason}
          email={email}
          certificationFile={certificationFile}
          detailAddress={detailAddress}
          roadAddress={roadAddress}
          depositorName={depositorName}
          isOpen={UpdateModalOpen}
          onClose={closeUpdateModal}
        />
      )}
    </CardContainer>
  );
};

export default ApplicationCard;
