// popup.js

console.log('popup.js loaded')

document.addEventListener('DOMContentLoaded', () => {
  const checkItemsButton = document.getElementById('checkButton');
  checkItemsButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs[0].id)
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkItems' }, (response) => {
        console.log('resp', response);
      });
    });
  });
});
