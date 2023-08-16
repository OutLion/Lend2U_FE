import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectReason from '../component/applicationDetail/SelectReason';
import SelectDevice from '../component/applicationDetail/SelectDevice';
import StyledFileInput from '../component/applicationDetail/StyledFileInput';
import axios from 'axios';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCountdown, setVerificationCountdown] = useState(300);
  const [countdown, setCountdown] = useState<number>(300);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [verificationButtonText, setVerificationButtonText] = useState('확인');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
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

  const handleSearchAddress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
  const handleDeviceTypeChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setSelectedDevice(newCourier);
    }
  };
  const handleSelectedReasonChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setSelectedReason(newCourier);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailVerification = () => {
    if (email === '') {
      setIsEmailEmpty(true);
      return;
    }
    setIsEmailVerified(true);
    setIsVerificationCompleted(false);
    setIsCodeInvalid(false);
    setIsEmailEmpty(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (countdown > 0 && isEmailVerified && !isVerificationCompleted) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0 || isVerificationCompleted) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isEmailVerified, isVerificationCompleted]);

  const handleResendEmail = () => {
    // 재발송하는 로직 추가
    setVerificationCountdown(300); // Reset countdown
    setCountdown(300); // Reset the countdown timer to 5 minutes
  };

  const handleVerify = () => {
    // 불러와서 검증하는 로직 추가
    if (verificationCode === '123456') {
      setIsVerificationCompleted(true);
      setIsCodeInvalid(false);
      setVerificationButtonText('인증완료');
      setEmail(email); // 이 부분을 변경
    } else {
      setIsVerificationCompleted(false);
      setVerificationCode('');
      setIsCodeInvalid(true);
      setVerificationButtonText('재입력');
    }
  };
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handeleDetailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailAddress(event.target.value);
  };
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Update the isFormComplete state whenever any required field changes
  useEffect(() => {
    const allFieldsFilled =
      name !== '' &&
      phoneNumber !== '' &&
      email !== '' &&
      selectedDevice !== '' &&
      selectedReason !== '' &&
      selectedFile !== null &&
      address !== '' &&
      detailAddress !== '' &&
      depositorName !== '' &&
      isCheckboxChecked;

    setIsFormComplete(allFieldsFilled);
  }, [
    name,
    phoneNumber,
    email,
    selectedDevice,
    selectedReason,
    selectedFile,
    address,
    detailAddress,
    depositorName,
    isCheckboxChecked
  ]);
  const handleSubmit = async () => {
    if (!isCheckboxChecked) {
      // Check if the checkbox is checked before submitting
      return;
    }

    const formData = new FormData(); // Create a FormData object to send multipart/form-data

    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('deviceType', selectedDevice);
    formData.append('reason', selectedReason);
    formData.append('selectedFile', selectedFile as Blob);
    formData.append('address', address);
    formData.append('detailAddress', detailAddress);
    formData.append('depositorName', depositorName);
    console.log(name, depositorName, email);
    try {
      // Send the POST request using Axios
      const response = await axios.post('/api/submit-application', formData);

      // Handle the response from the server as needed
      if (response.data.success) {
        // Do something on success, like showing a success message
        console.log('Application submitted successfully');
      } else {
        // Handle error case, show error message or take appropriate action
        console.error('Application submission failed');
      }
    } catch (error) {
      const err = error as Error;
      console.error('폼 제출 오류:', err.message);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <div>
      <Title>신청하기</Title>
      <BorderLine />
      <Container>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
          <SmallTitle>
            이름<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            전화번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={'예시 - 010-0000-0000'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            이메일<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <DownWrapper>
            <EmailInput
              id='name'
              type='text'
              value={email}
              onChange={handleEmailChange}
              placeholder={
                '이메일은 신청내역 조회에 사용되니 정확하게 입력해주세요'
              }
            />
            <CheckWrapper>
              {isEmailVerified ? (
                <>
                  <CodeInput
                    name='verificationCode'
                    type='text'
                    placeholder='인증번호'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    style={{ borderColor: isCodeInvalid ? 'red' : '' }} // border 색 추가
                  />
                  <Time>{formatTime(countdown)}</Time>
                  <IsCorrectbutton onClick={handleVerify}>
                    {verificationButtonText}
                  </IsCorrectbutton>
                  <Resendbutton onClick={handleResendEmail}>
                    재전송
                  </Resendbutton>
                </>
              ) : (
                <>
                  <EmailCheckButton
                    onClick={handleEmailVerification}
                    disabled={isEmailVerified}>
                    인증하기
                  </EmailCheckButton>
                </>
              )}
            </CheckWrapper>
          </DownWrapper>
          <BorderLine2></BorderLine2>
          <SmallTitle>
            신청 기기<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectDevice onChange={handleDeviceTypeChange}></SelectDevice>
          <SmallTitle>
            신청 사유<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectReason onChange={handleSelectedReasonChange}></SelectReason>
          <SmallTitle>
            기초수급자 증명서 업로드<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <StyledFileInput onChange={handleFileChange} />
          <SmallTitle>
            배송 주소<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <AddressInput
            type='text'
            value={address}
            onChange={handleAddressChange}
            placeholder='도로명 주소 검색'
          />
          <AddressButton onClick={handleSearchAddress}>검색</AddressButton>
          <AddressInput2
            type='text'
            value={detailAddress}
            onChange={handeleDetailAddressChange}
            placeholder='상세 주소'></AddressInput2>
          <SmallTitle>
            입금자명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SmallInfo>
            금액 8만원 = 7만원 (보증금/환불 예정) + 1만원 (배송비/제품관리비용)
            <br />
            농협은행 333-123456-45678 (예금주명 아웃라이언)
          </SmallInfo>
          <BorderLine3></BorderLine3>
          <Input3
            id='name'
            type='text'
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
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
          <DownWrapper>
            <StyledCheckbox
              type='checkbox'
              checked={isCheckboxChecked}
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <Agree>동의합니다</Agree>
          </DownWrapper>
          <SubmitButton
            type='button'
            disabled={!isFormComplete}
            onClick={handleSubmit}>
            작성 완료
          </SubmitButton>
        </Form>
      </Container>
    </div>
  );
}

export default Application;
const DownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Blank = styled.div`
  height: 30px;
`;
const AddressButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 100px;
  height: 41px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px;
  cursor: pointer;
  margin-left: 15px;
`;
const AddressInput = styled.input`
  height: 30px;
  width: 600px;
  margin-left: 30px;
  margin-bottom: 15px;
  margin-top: 13px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  color: #999999;
`;
const AddressInput2 = styled.input`
  height: 30px;
  width: 720px;
  margin-left: 30px;
  margin-bottom: 20px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  color: #999999;
`;
const Input3 = styled.input`
  height: 30px;
  width: 320px;
  margin-left: 30px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const BorderLine3 = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 36px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
`;
const BorderLine2 = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 36px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
  margin-bottom: 25px;
`;
const BasicInput = styled.input`
  width: 600px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 0px;
  margin-top: 10px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const EmailInput = styled.input`
  width: 370px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-top: 10px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const CheckWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const CodeInput = styled.input`
  width: 90px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #dbdbdf;
  background: #fff;
  padding-left: 0.6rem;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
  margin-left: 17px;
`;
const IsCorrectbutton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;

const Time = styled.div`
  font-family: 'GmarketSansMedium';
  width: 60px;
  height: 31px;
  margin-left: 10px;
  margin-top: 2px;
  border: none;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  cursor: pointer;
`;

const Resendbutton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;
const EmailCheckButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-left: 10px;
  margin-top: 2px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;
  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;
const SmallTitle = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
}`;
const SmallInfo = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
  margin-top: 10px;
}`;
const Agree = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
}`;
const BasicInfoAsterisk = styled.span`
  color: red;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 19px;
  height: 19px;
  margin-top: 6px;
  margin-right: 7px;
  margin-left: 650px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
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
  max-height: 130px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 20px;
  width: 700px;
  margin-left: 25px;
  scrollbar-width: thin; /* 스크롤바 너비 조정 */
  scrollbar-color: #888888 #f0f0f0; /* 스크롤바 색상 지정 */
  border-radius: 15px;
`;

const PrivacyAgreement = styled.div`
  /* 개인정보 동의서 스타일 설정 */
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%; /* 내용이 너무 커질 때 가로스크롤이 나타나지 않도록 */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  margin-top: 100px;
  font-size: 28px;
  margin-bottom: 15px;
  margin-left: 390px;
`;

const Form = styled.form`
  border-radius: 13px;
  background: #fff;
  padding: 20px;
  width: 800px;
  height: 1080px;
  box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;
  margin-left: 8px;
  margin-top: 50px;
`;

const SubmitButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 200px;
  height: 41px;
  margin-right: 10px;
  margin-left: 300px;
  margin-top: 20px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background-color: #0461e5;
  }

  &:disabled {
    border: 1px solid #a6c8ff;
    background: #8fbaff;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: #8fbaff;
  }
`;
