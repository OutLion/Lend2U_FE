import React, { useState } from 'react';
import axios from 'axios';

interface AdminRefuseModalProps {
  apply_id: string;
  applicationStatus: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rejectReason: string) => void;
}

const ControlStatusModal: React.FC<AdminRefuseModalProps> = ({
  apply_id,
  applicationStatus,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [status, setStatus] = useState('');

  const handleRejectSubmit = () => {
    if (status) {
      axios
        .put(`https://example-api.com/applications/${apply_id}`, {
          applicationStatus: status
        })
        .then((response) => {
          onConfirm(status);
          onClose();
        })
        .catch((error) => {
          // 처리 실패 시 에러 핸들링
          console.error('Error updating application status:', error);
        });
    }
    console.log(status);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <h2>내역 상태 반려</h2>
        <label htmlFor='rejectReason'>변경 상태:</label>
        <input
          type='text'
          id='rejectReason'
          value={applicationStatus}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleRejectSubmit}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default ControlStatusModal;
