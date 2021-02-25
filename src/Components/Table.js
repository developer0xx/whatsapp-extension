import React from 'react';
import {Row, Col} from "react-bootstrap";
import {SubTitle} from "./BaseComponents";
import styled from 'styled-components';
import {AddGroupText} from './BaseComponents';

export const TableHeader = ({keyText, valueText}) => {
  return <Row>
    <Col lg={5} md={5} sm={5} xs={5}><SubTitle>{keyText}</SubTitle></Col>
    <Col lg={7} md={7} sm={7} xs={7}><SubTitle>{valueText}</SubTitle></Col>
  </Row>
};

export const TableRow = ({data, bgColor, borderColor, index, changeText, remove}) => {
  return <CustomRow borderColor={borderColor}>
    <Col lg={1} md={1} sm={1} xs={1}><AddGroupText onClick={() => remove(index)}>{index + 1}</AddGroupText></Col>
    <Col lg={4} md={4} sm={4} xs={4}><Input bgColor={bgColor} value={data.keyText} onChange={ev => changeText(index, 'keyText', ev.target.value)}/></Col>
    <Col lg={7} md={7} sm={7} xs={7}><Textarea bgColor={bgColor} value={data.valueText} onChange={ev => changeText(index, 'valueText', ev.target.value)}/></Col>
  </CustomRow>
};
export const TableFooter = ({child1, child2}) => {
  return <Row>
    <Col lg={5} md={5} sm={5} xs={5}>{child1}</Col>
    <Col lg={7} md={7} sm={7} xs={7}>{child2}</Col>
  </Row>
};

const CustomRow = styled(Row)`
  border: 1px solid ${props => props.borderColor ? props.borderColor : '#6c78aa'};
  margin: 0;
  margin-bottom: 5px;
  padding-top: 3px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: ${props => props.bgColor};
  padding: 0 5px;
`;

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  resize: none;
  background-color: ${props => props.bgColor};
  padding: 0 5px;
`;
