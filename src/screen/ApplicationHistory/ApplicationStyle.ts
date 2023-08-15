import styled from 'styled-components';

export const NoticeApply = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 840px;
  height: 135px;
  text-align: center;
  padding: 1px 1px 1px 0px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  background: #fff;
  margin-left: 350px;
  margin-right: 20px;
`;

export const UpWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const IsCorrectbutton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  margin-top: 23px;
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

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 25px;
`;

export const BasicInfoText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 0.5rem;
  margin-top: 10px;
`;

export const StatusOption = styled.div`
  margin-left: 18px;
  border-radius: 14px;
  display: inline-block;
  border: 0.8px solid #d8d8d8;
  padding: 3px;
  width: 105px;
  height: 30px;
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  justify-content: space-around;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 5px;
  margin-right: 15px;
  margin-left: 9px;
  cursor: pointer;
  line-height: 30px;
  background: #e1e4fb;
  color: #000;
`;

export const ApplyOption = styled.div`
  margin-left: 18px;
  border-radius: 14px;
  display: inline-block;
  border: 0.8px solid #d8d8d8;
  padding: 3px;
  width: 105px;
  height: 30px;
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  justify-content: space-around;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 5px;
  margin-right: 15px;
  margin-left: 9px;
  cursor: pointer;
  line-height: 30px;
  background: #83b2ff;
  color: #000;
`;

export const BorderLine = styled.hr`
  stroke-width: 2px;
  width: 1120px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
  margin-bottom: 20px;
`;
export const BorderLine2 = styled.hr`
  stroke-width: 2px;
  width: 1080px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 15px;
  margin-bottom: 20px;
`;
export const Title = styled.div`
  margin-top: 100px;
  font-size: 28px;
  margin-bottom: 15px;
  margin-left: 390px;
`;

export const Notice = styled.div`
  width: 1120px;
  height: 300px;
  padding: 1px 1px 1px 0px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  background: #fff;
  margin-left: 388px;
  margin-top: 50px;
`;

export const NoticeTitle = styled.div`
  height: 26px;
  color: #222;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  font-style: normal;
  line-height: 21.6px;
  margin-top: 23px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const NoticeDetail = styled.div`
  color: #4f4f4f;
  font-family: 'GmarketSansLight';
  font-size: 17px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  margin-left: 20px;
  margin-bottom: 5px;
`;

export const StausWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 13px;
  margin-left: 12px;
`;

export const CardList = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 100px;
  margin-left: 400px;
`;

export const BasicInfoAsterisk = styled.span`
  color: red;
  font-family: 'GmarketSansMedium';
`;

export const Detail = styled.div`
  color: #4f4f4f;
  font-family: 'GmarketSansLight';
  font-size: 17px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  margin-left: 20px;
  margin-bottom: 5px;
`;

export const CheckButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 270px;
  height: 135px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
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
