import React, { useState } from 'react';
import axios from 'axios';

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
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <h2>내역 상태 반려</h2>
        <label htmlFor='rejectReason'>거절 사유:</label>
        <input
          type='text'
          id='rejectReason'
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
        <button onClick={handleRejectSubmit}>제출</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default AdminRefuseModal;
