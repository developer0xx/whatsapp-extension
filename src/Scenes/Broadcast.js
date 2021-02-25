import React from 'react';
import {TabContainer, TabBody, TabHeader, Space, SubTitle, ContentPanel, Button} from "../Components/BaseComponents";

const Broadcast = ({numbers, setNumbers, start}) => {
  const [text, setText] = React.useState('How are you buddy? I want to chat, please type #hello if you available. For example : #hello brother, I am good');
  return <TabContainer>
    <TabHeader color={'#f08349'}>
      <p>Initial broadcast template & Numbers to send</p>
    </TabHeader>
    <TabBody>
      <Space height={10}/>
      <SubTitle>Initial Broadcast Template</SubTitle>
      <ContentPanel value={text} onChange={ev => setText(ev.target.value)}/>
      <Space height={10}/>
      <SubTitle>Number to send (copy and paste here)</SubTitle>
      <ContentPanel rows={5} value={numbers} onChange={$event => setNumbers($event.target.value)}/>
      <Space height={5}/>
      <Button color={'#ee8e45'} position={'right'} onClick={() => start(text)}>Begin Broadcasting</Button>
    </TabBody>
  </TabContainer>
}

export default Broadcast
