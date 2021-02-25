import React from 'react';
import {
  TabContainer,
  TabBody,
  TabHeader,
  Space,
  AddGroupText,
  Button,
  FlexRowContainer
} from "../Components/BaseComponents";
import {TableHeader, TableRow, TableFooter} from "../Components/Table";

const FollowUp = ({start, group, changeText, editing, setEditing, cancelEdit, addGroup, removeGroup}) => {
  const keyText = 'Minute to wait';
  const valueText = 'AutoFollow up Message template if minute match';
  return <TabContainer>
    <TabHeader color={'#8cbe82'}>
      <p>Follow Up Templates (double click to edit)</p>
    </TabHeader>
    <TabBody>
      <Space height={5}/>
      <TableHeader keyText={keyText} valueText={valueText}/>
      {group.map((item, index) => {
        return <TableRow key={`row${index}`} data={item} bgColor={'#d6ead4'} borderColor={'#506250'} index={index} remove = {removeGroup}
                         changeText={changeText}/>
      })}
      <Space height={5}/>
      {editing ?
        <TableFooter
          child1={
            <FlexRowContainer>
              <AddGroupText onClick={() => setEditing(false)}>Save</AddGroupText>
              <AddGroupText onClick={() => cancelEdit()}>Cancel</AddGroupText>
            </FlexRowContainer>
          }
          child2={<Button color={'#2a7529'} position={'left'} onClick={() => start()}>Activate auto follow up</Button>}/>
        :
        <TableFooter
          child1={<AddGroupText onClick={() => addGroup()}>+ Add template group</AddGroupText>}
          child2={<Button color={'#2a7529'} position={'left'} onClick={() => start()}>Activate auto follow up</Button>}/>
      }
    </TabBody>
  </TabContainer>
};

export default FollowUp
