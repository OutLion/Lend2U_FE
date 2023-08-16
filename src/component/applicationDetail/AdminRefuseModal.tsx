import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  BasicInput,
  BasicLabel,
  Title,
  ModalOverlay,
  ButtonWrapper,
  Border
} from './ModalStyle';

interface AdminRefuseModalProps {
  apply_id: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rejectReason: string) => void;
}

const AdminRefuseModal: React.FC<AdminRefuseModalProps> = ({
  apply_id,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [rejectReason, setRejectReason] = useState('');

  const handleRejectSubmit = () => {
    if (rejectReason) {
      axios
        .put(`https://example-api.com/applications/${apply_id}`, {
          applicationStatus: '신청 반려',
          refuseReason: rejectReason
        })
        .then((response) => {
          onConfirm(rejectReason);
          onClose();
        })
        .catch((error) => {
          // 처리 실패 시 에러 핸들링
          console.error('Error updating application status:', error);
        });
    }
    console.log(rejectReason);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>신청내역 반려</Title>
          <Border></Border>
          <BasicInput
            id='rejectReason'
            value={rejectReason}
            placeholder={'거절 사유를 작성해주세요.'}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleRejectSubmit}>제출</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default AdminRefuseModal;
