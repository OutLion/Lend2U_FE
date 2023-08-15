import React, { useState } from 'react';
import axios from 'axios';

interface AdminRefuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  waybillNumber: string;
  courier: string;
  bank: string;
  deposit: string;
}

const InfoModal: React.FC<AdminRefuseModalProps> = ({
  isOpen,
  onClose,
  deposit,
  courier,
  bank,
  waybillNumber
}) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <h2>내역 상태 반려</h2>
        <label>택배사: {deposit}</label>
        <label>운송장 번호: {courier}</label>
        <label>은행: {bank}</label>
        <label>보증금 계좌: {waybillNumber}</label>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default InfoModal;
