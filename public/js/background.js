// Background.js

$(function(){
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('background message received');
    switch(request.message) {
      case "broadcast_start" :
        console.log('broadcast_start');
        broadcast_start(request.data, 0);
        break;
      default:
        console.log(`Unexpected message : ${request.message}`);
    }
  });
});

const broadcast_start = (data, index) => {
  if (index < data.length && data[index]) {
    send_message(data[index], broadcast_start.bind(this. data, index + 1))
  }
};

const send_message = (url, cb) => {
  chrome.tabs.create({ url: `https://${url}`}, function (tab) {
    console.log('tab created');
    chrome.tabs.onUpdated.addListener(function (updated_tabid, changeInfo) {
      if (updated_tabid === tab.id && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tab.id, { message: "send_message"});
        console.log('sent signal to content script');
      }
    })
  })
};
