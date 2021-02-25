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

const Reply = ({start, group, changeText, editing, setEditing, cancelEdit, addGroup, removeGroup}) => {
  const keyText = 'UserKewword to identify & then send msg to user';
  const valueText = 'Autoreply broadcast Message Template to send to user if userkeyword identified';
  return <TabContainer>
    <TabHeader color={'#5a9fdc'}>
      <p>Broadcast keyword & Templates (double click to edit)</p>
    </TabHeader>
    <TabBody>
      <Space height={5}/>
      <TableHeader keyText={keyText} valueText={valueText}/>
      {group.map((item, index) => {
        return <TableRow key={`row${index}`} data={item} bgColor={'#bed5f5'} borderColor={'#6c78aa'} index={index} remove = {removeGroup}
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
          child2={<Button color={'#005ac6'} position={'left'} onClick={() => start()}>Activate autoreply</Button>}/>
        :
        <TableFooter
          child1={<AddGroupText onClick={() => addGroup()}>+ Add template group</AddGroupText>}
          child2={<Button color={'#005ac6'} position={'left'} onClick={() => start()}>Activate autoreply</Button>}/>
      }
    </TabBody>
  </TabContainer>
};

export default Reply
