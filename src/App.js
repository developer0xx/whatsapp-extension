/* global chrome */
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from "react-bootstrap";
import {Broadcast, Reply, FollowUp} from './Scenes'
import useViewModel from "./method";

const App = () => {
  const vm = useViewModel();
    return (
        <div className={'container'}>
          <Tabs defaultActiveKey="broadcast">
            <Tab eventKey="broadcast" title="Broadcast">
              <Broadcast numbers={vm.numbers} setNumbers={vm.setNumbers} start={vm.broadcast_start}/>
            </Tab>
            <Tab eventKey="reply" title="Reply">
              <Reply
                start={vm.reply_start}
                group={vm.group}
                changeText={vm.changeText}
                editing={vm.editing}
                setEditing={vm.setEditing}
                cancelEdit={vm.cancelEdit}
                addGroup={vm.addGroup}
                removeGroup={vm.removeGroup}
              />
            </Tab>
            <Tab eventKey="followup" title="FollowUp">
              <FollowUp
                start={vm.followup_start}
                group={vm.fwGroup}
                changeText={vm.changeFwText}
                editing={vm.fwEditing}
                setEditing={vm.setFwEditing}
                cancelEdit={vm.cancelFwEdit}
                addGroup={vm.addFwGroup}
                removeGroup={vm.removeFwGroup}
              />
            </Tab>
          </Tabs>
        </div>
    )
}

export default App;
