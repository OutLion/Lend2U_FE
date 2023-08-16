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
  onClose: () => void;
}

const DeleteModal: React.FC<AdminRefuseModalProps> = ({
  apply_id,
  onClose
}) => {
  const handleRejectSubmit = () => {
    //삭제하는 로직
    axios
      .delete(`https://example-api.com/applications/${apply_id}`)
      .then((response) => {
        onClose(); // Close the modal after successful deletion
      })
      .catch((error) => {
        // Handle deletion failure
        console.error('Error deleting application:', error);
      });
    onClose();
    console.log(apply_id, 'delete');
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>신청내역 삭제</Title>
          <Border></Border>
          <BasicLabel>신청내역을 삭제하시겠습니까?</BasicLabel>
          <ButtonWrapper>
            <BasicButton onClick={handleRejectSubmit}>삭제</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default DeleteModal;
