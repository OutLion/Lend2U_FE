import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    daum: any; // Daum 우편번호 서비스 API 객체의 타입 정의
  }
}

function Application() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [deposit, setDeposit] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);

  useEffect(() => {
    // Daum 우편번호 서비스 스크립트 동적 로드
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = () => {
    //주소 검색 로직
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address);
        }
      }).open();
    } else {
      console.error('Daum Postcode API not loaded.');
    }
  };
  const handleDeviceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDevice(event.target.value);
  };

  const handleSelectedReasonChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReason(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  const handleVerify = () => {
    // 인증 로직 추가
  };

  const handleResendVerification = () => {
    // 재전송 로직 추가
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handeleDetailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 신청 정보를 처리하거나 제출하는 로직 추가
  };

  return (
    <Container>
      <Title>신청하기</Title>
      <BorderLine />
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>전화번호</Label>
            <Input
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='01012345678'
            />
          </FormGroup>
          <FormGroup>
            <Label1>신청 기기</Label1>
            <Select value={selectedDevice} onChange={handleDeviceTypeChange}>
              <option value='laptop'>노트북</option>
              <option value='tablet'>태블릿</option>
            </Select>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup>
            <Label1>신청 사유</Label1>
            <Select
              value={selectedReason}
              onChange={handleSelectedReasonChange}>
              <option value='coding'>코딩</option>
              <option value='work'>사무작업</option>
              <option value='study'>학업용</option>
              <option value='etc'>기타</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input type='email' value={email} onChange={handleEmailChange} />
            <Button onClick={handleVerify}>인증하기</Button>
          </FormGroup>
          <FormGroup>
            <Input
              type='text'
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder='5분 안에 입력해주세요'
            />
            <Button onClick={handleResendVerification}>재전송</Button>
          </FormGroup>
        </Row>

        <FormGroup>
          <Span>기초수급자 증명서 업로드</Span>
          <Input type='file' accept='.pdf,.jpg,.png' />
        </FormGroup>
        <FormGroup>
          <Span>배송 주소</Span>
          <Input
            type='text'
            value={address}
            onChange={handleAddressChange}
            placeholder='도로명 주소 검색'
          />
          <Button onClick={handleSearchAddress}>검색</Button>

          <Input
            type='text'
            value={detailAddress}
            onChange={handeleDetailAddressChange}
            placeholder='상세 주소'
          />
        </FormGroup>
        <Span1>
          보증금 7만원 + 배송비(왕복배송비+제품관리비용) 1만원 = 8만원
        </Span1>
        <FormGroup>
          <Input
            type='text'
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            placeholder='입금자명'
          />
          <H5>입금계좌 농협은행 345-382589-3387((주)아웃라이언)</H5>
        </FormGroup>

        <FormGroup>
          <ScrollableContent>
            <PrivacyAgreement>
              <h4>개인정보 수집 동의</h4>
              <p>[개인정보 수집 동의서]</p>
              <p>
                [수집하는 개인정보 항목] 1. 성명 2. 주소 3. 연락처 (전화번호,
                이메일) 4. 기초생활수급자 증명서 5. 대여기록 6. 결제 정보
                (계좌번호)
              </p>
              <p>
                [개인정보의 수집 및 이용 목적]
                <br />
                위에서 수집하는 개인정보는 다음과 같은 목적으로 이용됩니다.
                <br />
                1. 서비스 제공: 상품 또는 서비스의 구매, 판매, 배송 등 거래 및
                2. 서비스 제공을 위하여 개인정보를 수집하고 이용합니다.
                <br />
                3. 고객 상담 및 문의 처리: 고객 문의사항에 대한 처리, 불만 접수
                및 처리, 서비스 문제 해결을 위해 개인정보를 수집하고 이용합니다.
                <br />
                4. 서비스 개선: 서비스의 품질 향상, 새로운 서비스 개발 등을 위해
                개인정보를 활용합니다.
              </p>
              <p>
                [개인정보의 보유 및 이용기간]
                <br />
                이용자의 개인정보는 개인정보의 수집 및 이용목적이 달성되거나,
                이용자가 동의를 철회하는 경우에는 지체 없이 파기됩니다. 단,
                법령에 특별한 규정이 있는 경우에는 그에 따라 보존할 수 있습니다.
              </p>
              <p>
                [개인정보 제공 동의]
                <br />
                개인정보의 수집 및 이용에 동의합니다. 제공하는 개인정보는 해당
                서비스의 제공을 위한 목적으로만 이용되며, 목적 이외의 용도로는
                사용되지 않습니다. 동의를 거부할 권리가 있으나, 동의를 거부하는
                경우에는 일부 서비스가 제한될 수 있습니다.
              </p>
            </PrivacyAgreement>
          </ScrollableContent>
        </FormGroup>
        <FormGroup>
          <CheckboxLabel>
            <Checkbox
              type='checkbox'
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
            />
            동의합니다
          </CheckboxLabel>
        </FormGroup>
        <SubmitButton type='submit'>작성 완료</SubmitButton>
      </Form>
    </Container>
  );
}

export default Application;

const H5 = styled.h5`
  /*입금계좌 안내문구*/
  font-size: 13px;
  color: #333;
  white-space: nowrap; /* 넘치는 텍스트 줄 바꿈 방지 */
  margin: 18px;
`;

const Button = styled.button`
  /*검색, 재전송 등 버튼 스타일*/
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 130px;
  height: 35px;
`;

const Span = styled.span`
  /*기초수급자 인증서 업로드 및 배송주소 스타일*/
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: inline-block;
  white-space: nowrap;
  width: 200px;
  margin-bottom: 7px;
  margin-top: 14px;
`;

const Span1 = styled.span`
  /*입금 안내 문구*/
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 10px;
  margin-left: 18px;
`;

const Row = styled.div`
  /* 한줄에 배열되도록 컴포넌트 묶기*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BorderLine = styled.hr`
  /*borderline 스타일 설정*/
  stroke-width: 2px;
  width: 1169px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-bottom: 25px;
`;

const ScrollableContent = styled.div`
  /* 스크롤바 스타일 설정 */
  max-height: 100px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 5px;
  scrollbar-width: thin; /* 스크롤바 너비 조정 */
  scrollbar-color: #888888 #f0f0f0; /* 스크롤바 색상 지정 */
`;

const PrivacyAgreement = styled.div`
  /* 개인정보 동의서 스타일 설정 */
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%; /* 내용이 너무 커질 때 가로스크롤이 나타나지 않도록 */
`;

const Container = styled.div`
  /* 컨테이너 스타일 설정 */
  width: 1223px;
  height: 680px;
  position: relative;
  background: linear-gradient(
    180deg,
    #f1f3ff 1.03%,
    rgba(127, 138, 242, 0) 100%
  );
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
`;

const Title = styled.h2`
  /* 신청하기 타이틀 스타일 설정 */
  width: 218.2px;
  height: 45px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-size: 30px;
  line-height: 45px;
  letter-spacing: -2px;
  color: #000000;
  margin-bottom: 15px;
  text-align: left;
  margin-top: 20px;
  margin-left: 70px;
`;

const Form = styled.form`
  /* 폼 스타일 설정 */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;

  width: 1100px;
  height: 510px;
  padding: 1px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 4px 30px 3px #2a72ff40;
`;

const FormGroup = styled.div`
  /* 폼 그룹 스타일 설정 */
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 3px 15px;
`;

const Label = styled.div`
  /* 라벨 스타일 설정 */
  font-weight: bold;
  display: inline-block;
  width: 115px;
  margin-top: 15px;
`;

const Label1 = styled.div`
  /* 라벨 스타일 설정 (신청기기, 신청사유)*/
  font-weight: bold;
  display: inline-block;
  width: 120px;
  margin-top: 10px;
`;

const Input = styled.input`
  /* 입력 필드 스타일 설정 */
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 17px;
`;

const Select = styled.select`
  /* 선택 필드 스타일 설정 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
  height: 33px;
`;

const CheckboxLabel = styled.label`
  /* 체크박스 라벨 스타일 설정 */
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  /* 체크박스 스타일 설정 */
  margin-right: 8px;
  appearance: none; /* 기본 스타일 제거 */
  border: 2px solid #ccc; /* 체크박스 모양 설정 */
  width: 15px;
  height: 15px;
  border-radius: 3px;
  outline: none; /* 포커스 시 브라우저 기본 테두리 제거 */
  cursor: pointer;

  &:checked {
    background-color: #000000;
    border-color: #dbdbdf;
  }
`;

const SubmitButton = styled.button`
  /* 작성완료 제출 버튼 스타일 설정 */
  background: linear-gradient(0deg, #428aff, #428aff),
    linear-gradient(0deg, #a6c8ff, #a6c8ff);
  border: 1px solid #a6c8ff;
  width: 127px;
  height: 43px;
  radius: 14px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 11px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  /* 오른쪽 정렬 */
  margin-left: 990px;

  &:hover {
    background-color: #f1f3ff;
  }
`;
