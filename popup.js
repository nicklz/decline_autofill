// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const checkButton = document.getElementById('checkButton');

  // Send a message to the content script when the button is clicked
  checkButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'check_decline_items' }, function (response) {
        console.log(response.message);
      });
    });
  });
});
