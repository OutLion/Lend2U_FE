import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer2,
  ModalContent,
  BasicButton,
  BasicInput,
  BasicLabel,
  Title,
  ModalOverlay,
  ButtonWrapper,
  Border,
  BasicInput2
} from './ModalStyle';
import SelectCourier from './SelectCourier';
import SelectBank from './SelectBank';

interface AdminRefuseModalProps {
  apply_id: string;
  onClose: () => void;
}

const StatusModal: React.FC<AdminRefuseModalProps> = ({
  apply_id,
  onClose
}) => {
  const [billNumber, setBillNumber] = useState('');
  const [courierName, setCourierName] = useState('');
  const [bankName, setBankName] = useState('');
  const [depositNum, setDepositNum] = useState('');
  const handleCourierChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setCourierName(newCourier);
    }
  };
  const handleBankChange = (newBank: string | null) => {
    if (newBank !== null) {
      setBankName(newBank);
    }
  };
  const handleSubmit = () => {
    if (billNumber && courierName && bankName && depositNum) {
      axios
        .put(`https://example-api.com/applications/${apply_id}`, {
          waybillNumber: billNumber,
          courier: courierName,
          bank: bankName,
          deposit: depositNum
        })
        .then((response) => {
          onClose();
        })
        .catch((error) => {
          console.error('Error updating application status:', error);
        });
    }
    console.log(billNumber, courierName, bankName, depositNum);
    onClose();
  };

  return (
    <ModalContainer2>
      <ModalOverlay>
        <ModalContent>
          <Title>반환정보 입력</Title>
          <Border></Border>
          <BasicLabel>반환 택배 정보</BasicLabel>
          <SelectCourier onChange={handleCourierChange} />
          <BasicInput2
            id='billNumber'
            value={billNumber}
            placeholder={'운송장 번호 입력'}
            onChange={(e) => setBillNumber(e.target.value)}
          />
          <BasicLabel>보증금 환불 정보</BasicLabel>
          <SelectBank onChange={handleBankChange} />
          <BasicInput2
            id='depositNum'
            value={depositNum}
            placeholder={'보증금 환불 계좌번호 입력'}
            onChange={(e) => setDepositNum(e.target.value)}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleSubmit}>제출</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer2>
  );
};

export default StatusModal;
