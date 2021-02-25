import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #cdcdcd;
`;

const TabHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.color};
  color: #fff;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  height: 34px;
`;

const TabBody = styled.div`
  width: 100%;
  padding: 10px;
`;

const Space = styled.div`
  width: ${props => props.width ? props.width : 0}px;
  height: ${props => props.height ? props.height: 0}px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

const ContentPanel = styled.textarea`
  width: 100%;
  padding: 5px;
  background-color: #fff0d0;
  resize: none;
  border: none;
`;

const Button = styled.button`
  background-color: ${props => props.color};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0 40px;
  font-weight: bold;
  float: ${props => props.position ? props.position : 'left'};
`;

const FlexRowContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AddGroupText = styled.p`
  text-decoration: underline;
  &:hover {
    color: blue;
    cursor: pointer;
  }
`;

export {
  TabContainer,
  TabBody,
  TabHeader,
  Space,
  SubTitle,
  ContentPanel,
  Button,
  AddGroupText,
  FlexRowContainer
}
