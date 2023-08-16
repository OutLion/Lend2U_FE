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
  Border,
  ButtonWrapper
} from './ModalStyle';
import SelectStatus from './SelectStatus';

interface AdminRefuseModalProps {
  apply_id: string;
  applicationStatus: string;
  isOpen: boolean;
  onClose: () => void;
}

const ControlStatusModal: React.FC<AdminRefuseModalProps> = ({
  apply_id,
  applicationStatus,
  isOpen,
  onClose
}) => {
  const [status, setStatus] = useState('');
  const handleStatusChange = (newStatus: string | null) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };
  const handleRejectSubmit = () => {
    if (status) {
      axios
        .put(`https://example-api.com/applications/${apply_id}`, {
          applicationStatus: status
        })
        .then((response) => {
          onClose();
        })
        .catch((error) => {
          // 처리 실패 시 에러 핸들링
          console.error('Error updating application status:', error);
        });
    }
    console.log(apply_id, status);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>내역상태 변경</Title>
          <Border></Border>
          <SelectStatus
            status={applicationStatus}
            onChange={handleStatusChange}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleRejectSubmit}>저장</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default ControlStatusModal;
