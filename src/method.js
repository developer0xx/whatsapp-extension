/* global chrome */
import React from 'react';

const useViewModel = () => {
  const [activeTab, setActiveTab] = React.useState(null);
  // const [numbers, setNumbers] = React.useState('8615712448568');
  const [numbers, setNumbers] = React.useState('447710173736');
  const [group, setGroup] = React.useState([
    {keyText: '#hello', valueText: 'Nice to meet you. #hellotoo'},
    {keyText: '#awesome', valueText: 'You are also #awesome'}
  ]);
  const [editing, setEditing] = React.useState(false);
  const [fwGroup, setFwGroup] = React.useState([
    {keyText: '120', valueText: 'Hello, I am waiting reply for two hour, would you mind to reply'},
    {keyText: '240', valueText: 'Sorry to interrupt you again, because of no reply, I will mark this conversation to idle'}
  ]);
  const [fwEditing, setFwEditing] = React.useState(false);
  React.useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      setActiveTab(tabs[0]);
    })
  }, []);
  const changeText = (index, key, value) => {
    setGroup([...group.slice(0, index), {...group[index], [key]: value}, ...group.slice(index + 1)])
  };
  const addGroup = () => {
    setGroup([...group, {keyText: '', valueText: ''}]);
    setEditing(true);
  };
  const cancelEdit = () => {
    setGroup([...group.slice(0, group.length-1)]);
    setEditing(false);
  };
  const removeGroup = (index) => {
    setGroup([...group.slice(0, index), ...group.slice(index + 1)]);
  }

  const changeFwText = (index, key, value) => {
    setFwGroup([...fwGroup.slice(0, index), {...fwGroup[index], [key]: value}, ...fwGroup.slice(index + 1)])
  };
  const addFwGroup = () => {
    setFwGroup([...fwGroup, {keyText: '', valueText: ''}]);
    setFwEditing(true);
  };
  const cancelFwEdit = () => {
    setFwGroup([...fwGroup.slice(0, fwGroup.length-1)]);
    setFwEditing(false);
  };
  const removeFwGroup = (index) => {
    setFwGroup([...fwGroup.slice(0, index), ...fwGroup.slice(index + 1)]);
  };

  const broadcast_start = (text) => {
    chrome.tabs.sendMessage(activeTab.id, {message: 'broadcast_start', data: {numbers: numbers.split('\n'), text}})
  };

  const reply_start = () => {
    chrome.tabs.sendMessage(activeTab.id, {message: 'reply_start', data: {numbers: numbers.split('\n'), keywords: group}})
  };

  const followup_start = () => {
    chrome.tabs.sendMessage(activeTab.id, {message: 'followup_start', data: {numbers: numbers.split('\n'), keywords: fwGroup}})
  };

  return {
    numbers,
    setNumbers,
    broadcast_start,
    reply_start,
    group,
    setGroup,
    editing,
    setEditing,
    addGroup,
    removeGroup,
    cancelEdit,
    changeText,
    fwGroup,
    changeFwText,
    addFwGroup,
    cancelFwEdit,
    removeFwGroup,
    fwEditing,
    setFwEditing,
    followup_start
  }
};

export default useViewModel
