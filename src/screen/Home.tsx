import React from 'react';
import Header from '../component/Header';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import Footer from '../component/Footer';

function Home() {
  return (
    <div>
      <Header />
      <HomePage>
        <Element name='service-intro'>
          <Section>
            <Title>서비스 소개</Title>
            <BorderLine />
            <Content></Content>
          </Section>
        </Element>
        <Element name='device-specs'>
          <Section>
            <Title>기기 스펙 조회</Title>
            <BorderLine />
            <Content></Content>
          </Section>
        </Element>
        <Element name='application-history'>
          <Section>
            <Title>신청 내역 조회</Title>
            <BorderLine />
            <Content></Content>
          </Section>
        </Element>
      </HomePage>
      <Footer />
    </div>
  );
}

export default Home;

const HomePage = styled.div`
  margin-top: 5rem;
`;

const Section = styled.div`
  padding: 0 36px;
  margin-top: 300px;
`;

const BorderLine = styled.hr`
  stroke-width: 2px;
  width: 1000px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
  margin-bottom: 25px;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 400px;
`;

const Content = styled.div`
  border-radius: 13px;
  background: #fff;
  padding: 20px;
  width: 659px;
  height: 300px;
  box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 300px;
  margin-left: 400px;
`;
