console.log('contentScript.js loaded');

function autoCheckItems() {
  console.log(1)
  const items = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
  console.log(2)
  for (let item of items) {
    console.log(3)
    const label = item.labels[0];
    if (label && (label.textContent.toLowerCase().includes('decline') || label.textContent.toLowerCase().includes('wish') || label.textContent.toLowerCase().includes('prefer'))) {
      console.log(4)
      item.checked = true;
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('mess', message.action)
  if (message.action === 'checkItems') {
    autoCheckItems();
    sendResponse({ message: 'Items checked' });
    console.log(5)
  }
});
