// contentScript.js

function checkDeclineItems() {
  const labels = document.querySelectorAll('label');

  labels.forEach(label => {
    const labelText = label.innerText.toLowerCase();

    if (labelText.includes('decline') || labelText.includes('wish')) {
      const inputElement = label.querySelector('input[type="radio"], input[type="checkbox"]');
      if (inputElement) {
        inputElement.checked = true;
      }
    }
  });
}

// Listen for a message from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'check_decline_items') {
    checkDeclineItems();
    sendResponse({ message: 'Items checked.' });
  }
});
