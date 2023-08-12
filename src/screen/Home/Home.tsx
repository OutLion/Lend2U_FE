import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import {
  DownWrapper,
  Wrapper,
  UpWrapper,
  BorderLine,
  UnderWrapper,
  HomePage,
  SpecialWrapper,
  SecondWrapper,
  NoticeTitle,
  Notice,
  NoticeApply,
  ApplyButton,
  CheckButton,
  EmailCheckButton,
  NoticeDetail,
  Detail,
  SpecNotice,
  Agree,
  AgreeContent,
  Section,
  Title,
  BasicInfoText,
  BasicInfoAsterisk,
  BasicInput,
  StyledCheckbox,
  ServiceIntro,
  CardList,
  CheckWrapper,
  IsCorrectbutton,
  Resendbutton,
  CodeInput,
  Content,
  Time
} from './HomeStyle';
import { Element } from 'react-scroll';
import Footer from '../../component/Footer';
import '../../App.css';
import LaptopCard from '../../component/Spec/LaptopCard';
import TabletCard from '../../component/Spec/TabletCard';
function Home() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCountdown, setVerificationCountdown] = useState(300);
  const [countdown, setCountdown] = useState<number>(300);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const handleEmailVerification = () => {
    if (email === '') {
      setIsEmailEmpty(true); // Set the email empty state to true
      return;
    }
    // Implement email verification logic here
    // After successful verification:
    setIsEmailVerified(true);
    setIsVerificationCompleted(false); // Reset verification completion
    setIsEmailEmpty(false); // Reset the email empty state
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (countdown > 0 && isEmailVerified) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isEmailVerified]);

  // ... Rest of the code ...

  const handleResendEmail = () => {
    // Implement logic to resend the verification email
    setVerificationCountdown(300); // Reset countdown
    setCountdown(300); // Reset the countdown timer to 5 minutes
  };

  const handleVerify = () => {
    // Implement logic to verify the entered verification code
    if (verificationCode === '123456') {
      setIsVerificationCompleted(true);
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
  return (
    <div>
      <Header />
      <HomePage>
        <Element name='service-intro'>
          <Section>
            <ServiceIntro></ServiceIntro>
            <Notice>
              <NoticeTitle>주의사항</NoticeTitle>
              <NoticeDetail>
                훼손이 발생할 경우에는 수리비가 보증금에서 차감되어 전액
                반환되지 않을 수 있습니다.
              </NoticeDetail>
              <NoticeDetail>
                장기 연체와 사용이 불가능할 정도의 심한 파손이 발생한 경우에는
                기기 재구매 비용과 법적 조치가 이어질 수 있습니다.
              </NoticeDetail>
              <NoticeDetail>
                전자기기의 사양은 최소사양만 조회 가능하며 랜덤으로 제공되고,
                대여기간은 2주입니다.
              </NoticeDetail>
            </Notice>
            <DownWrapper>
              <Agree>
                <AgreeContent>
                  주의사항 모두 확인했어요.
                  <BasicInfoAsterisk> (필수)</BasicInfoAsterisk>
                </AgreeContent>
                <StyledCheckbox
                  type='checkbox'
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
              </Agree>
              <ApplyButton disabled={!isCheckboxChecked}>
                서비스 신청하기
              </ApplyButton>
            </DownWrapper>
          </Section>
        </Element>
        <Element name='device-specs'>
          <Section>
            <Title>기기 스펙 조회</Title>
            <BorderLine />
            <SpecNotice>
              <Wrapper>
                <Detail>
                  기기는 최소 보장 사양만을 조회할 수 있고, 순서와는 관계없이
                  신청 사유를 바탕으로 제공드려요!
                </Detail>
                <Detail>
                  모두에게 동등한 사용 기회를 제공하고자 하는 의도에서 시작했고,
                  최소 사양의 기기를 받더라도 사용상 문제가 없는 제품만을
                  제공해요
                </Detail>
              </Wrapper>
            </SpecNotice>
            <CardList>
              <LaptopCard></LaptopCard>
              <TabletCard></TabletCard>
            </CardList>
          </Section>
        </Element>
        <Element name='application-history'>
          <Section>
            <Title>신청 내역 조회</Title>
            <BorderLine />
            <SecondWrapper>
              <NoticeApply>
                <Content>
                  <UnderWrapper>
                    <BasicInfoText>
                      이메일
                      <BasicInfoAsterisk>*</BasicInfoAsterisk>
                    </BasicInfoText>
                    <BasicInput
                      name='email'
                      type='text'
                      placeholder={
                        isEmailEmpty
                          ? '이메일을 먼저 입력해주세요'
                          : '이메일을 입력하세요'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderColor: isEmailEmpty ? 'red' : '' }}
                    />
                  </UnderWrapper>
                  <CheckWrapper>
                    {isEmailVerified ? (
                      <>
                        <CodeInput
                          name='verificationCode'
                          type='text'
                          placeholder='인증번호'
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <Time>{formatTime(countdown)}</Time>
                        <IsCorrectbutton onClick={handleVerify}>
                          {isVerificationCompleted ? '인증완료' : '확인'}
                        </IsCorrectbutton>
                        <Resendbutton onClick={handleResendEmail}>
                          재전송
                        </Resendbutton>
                      </>
                    ) : (
                      <>
                        <EmailCheckButton
                          onClick={handleEmailVerification}
                          disabled={isEmailVerified} // Disable if email is already verified
                        >
                          인증하기
                        </EmailCheckButton>
                      </>
                    )}
                  </CheckWrapper>
                </Content>
              </NoticeApply>
              <CheckButton disabled={!isVerificationCompleted}>
                신청내역 조회
              </CheckButton>
            </SecondWrapper>
          </Section>
        </Element>
      </HomePage>
      <Footer />
    </div>
  );
}

export default Home;
