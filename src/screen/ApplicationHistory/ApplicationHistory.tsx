import React, { useState } from 'react';
import {
  BorderLine,
  Title,
  Notice,
  NoticeDetail,
  NoticeTitle,
  BorderLine2,
  StausWrapper,
  StatusOption,
  ApplyOption
} from './ApplicationStyle';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import ApplicationCard from './ApplicationCard';
import { useParams } from 'react-router-dom';

function ApplicationHistory() {
  const { email } = useParams();
  //const [sampleData, setSampleData] = useState([]);
  // useEffect(() => {
  //   axios.get('URL_데이터_엔드포인트')
  //     .then((response) => {
  //       setSampleData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
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
      returnDate: '',
      depositorName: '홍길동',
      applicationStatus: '접수중',
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
      email: 'lya8690@naver.com',
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
  const filteredSampleData = sampleData.filter((data) => data.email === email);
  return (
    <div>
      <Title>신청 내역 조회</Title>
      <BorderLine />
      <Notice>
        <NoticeTitle>상태 표기</NoticeTitle>
        <StausWrapper>
          <StatusOption>접수중</StatusOption>
          <StatusOption style={{ background: '#ffa5a5' }}>
            신청 반려
          </StatusOption>
          <StatusOption>취소 완료</StatusOption>
          <StatusOption>승인 대기</StatusOption>
          <StatusOption>배송중</StatusOption>
          <StatusOption>배송 완료</StatusOption>
          <ApplyOption>반환 신청</ApplyOption>
          <StatusOption>반환 완료</StatusOption>
        </StausWrapper>
        <BorderLine2 />
        <NoticeTitle>주의사항</NoticeTitle>
        <NoticeDetail>
          취소와 수정은 상태가 접수중일때만 가능합니다.
        </NoticeDetail>
        <NoticeDetail>
          수령시 받은 택배 박스는 버리지 않고 반환 시 최대한 동일한 상태로
          포장하며 보내주시기 바랍니다.
        </NoticeDetail>
        <NoticeDetail>
          배송 완료 후 2주가 지나면 자동으로 ‘반환 신청’으로 상태가 변경되고,
          버튼을 눌러 운송장번호를 기입해주시기 바랍니다.
        </NoticeDetail>
        <NoticeDetail>반환 주소 : 서울특별시 서대문구 거북골로 34</NoticeDetail>
      </Notice>
      {filteredSampleData.map((data) => (
        <ApplicationCard key={data.apply_id} {...data} />
      ))}
    </div>
  );
}
export default ApplicationHistory;
