import React from 'react';
import { BorderLine, Title } from './AdminStyle';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import ApplicationCardForAdmin from '../../component/applicationDetail/ApplicationCardForAdmin';

function Admin() {
  const sampleData: ApplicationDetailProps[] = [
    {
      apply_id: '1',
      name: '홍길동',
      phoneNum: '010-1234-5678',
      device: '태블릿',
      applicationReason: '코딩/프로그래밍',
      email: 'john@example.com',
      certificationFile: 'cert123.pdf',
      detailAddress: '서울특별시 은평구 은평로1515',
      roadAddress: '00오피스텔 687호',
      applyDate: '2023-08-15',
      returnDate: '2023-08-25',
      depositorName: '홍길동',
      applicationStatus: '신청 반려',
      refuseReason: '',
      waybillNumber: '',
      courier: '',
      bank: '',
      deposit: ''
    },
    {
      apply_id: '2',
      name: '홍길동',
      phoneNum: '010-1234-5678',
      device: '태블릿',
      applicationReason: '코딩/프로그래밍',
      email: 'john@example.com',
      certificationFile: 'cert123.pdf',
      detailAddress: '서울특별시 은평구 은평로1515',
      roadAddress: '00오피스텔 687호',
      applyDate: '2023-08-15',
      returnDate: '2023-08-25',
      depositorName: '홍길동',
      applicationStatus: '신청 반려',
      refuseReason: '',
      waybillNumber: '',
      courier: '',
      bank: '',
      deposit: ''
    },
    {
      apply_id: '3',
      name: '홍길동',
      phoneNum: '010-1234-5678',
      device: '태블릿',
      applicationReason: '코딩/프로그래밍',
      email: 'john@example.com',
      certificationFile: 'cert123.pdf',
      detailAddress: '서울특별시 은평구 은평로1515',
      roadAddress: '00오피스텔 687호',
      applyDate: '2023-08-15',
      returnDate: '2023-08-25',
      depositorName: '홍길동',
      applicationStatus: '접수 승인',
      refuseReason: '',
      waybillNumber: '',
      courier: '',
      bank: '',
      deposit: ''
    },
    {
      apply_id: '4',
      name: '홍길동',
      phoneNum: '010-1234-5678',
      device: '태블릿',
      applicationReason: '코딩/프로그래밍',
      email: 'john@example.com',
      certificationFile: 'cert123.pdf',
      detailAddress: '서울특별시 은평구 은평로1515',
      roadAddress: '00오피스텔 687호',
      applyDate: '2023-08-15',
      returnDate: '2023-08-25',
      depositorName: '홍길동',
      applicationStatus: '반환 신청',
      refuseReason: '',
      waybillNumber: '',
      courier: '',
      bank: '',
      deposit: ''
    },
    {
      apply_id: '5',
      name: '홍길동',
      phoneNum: '010-1234-5678',
      device: '태블릿',
      applicationReason: '코딩/프로그래밍',
      email: 'john@example.com',
      certificationFile: 'cert123.pdf',
      detailAddress: '서울특별시 은평구 은평로1515',
      roadAddress: '00오피스텔 687호',
      applyDate: '2023-08-15',
      returnDate: '2023-08-25',
      depositorName: '홍길동',
      applicationStatus: '반환 완료',
      refuseReason: '',
      waybillNumber: '',
      courier: '',
      bank: '',
      deposit: ''
    }
  ];
  return (
    <div>
      <Title>관리자 페이지</Title>
      <BorderLine />
      {sampleData.map((data) => (
        <ApplicationCardForAdmin key={data.apply_id} {...data} />
      ))}
    </div>
  );
}

export default Admin;
