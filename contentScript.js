console.log('contentScript.js loaded');

function autoCheckItems() {
  const items = document.querySelectorAll('input[type="radio"], input[type="checkbox"], select');
  const selects = document.querySelectorAll('.select2-chosen');

  for (let item of items) {
    const label = item.labels[0];
    const tagName = item.tagName.toLowerCase();

    if (label && shouldCheckItem(label.textContent.toLowerCase())) {
      if (tagName === 'input') {
        item.checked = true;
      } else if (tagName === 'select') {
        // Select the first option as the default choice
        item.selectedIndex = 0;
      }
    }
  }

  for (let select of selects) {
    simulateClickOnCustomDropdown(select);
    const options = document.querySelectorAll('.select2-results li');

    for (let select of selects) {
      openCustomDropdown(select);
      const options = document.querySelectorAll('.select2-results li');
      for (let option of options) {
        const optionText = option.textContent.toLowerCase();
        if (shouldCheckItem(optionText)) {
          selectOption(option);
        }
      }
      closeCustomDropdown(select);
    }
  }
}

function openCustomDropdown(dropdown) {
  const event = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  dropdown.dispatchEvent(event);
}

function simulateClickOnCustomDropdown(dropdown) {
  const event = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  dropdown.dispatchEvent(event);
}

function shouldCheckItem(text) {
  const keywords = ['decline', 'wish', 'prefer'];
  return keywords.some(keyword => text.includes(keyword));
}

// Function to close custom select dropdowns
function closeCustomDropdown() {
  document.querySelectorAll('.select2-drop').forEach((result) => {
    result.remove();
  });
}



function selectOption(option) {
  const event = new MouseEvent('mouseup', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  option.dispatchEvent(event);
}

function shouldCheckItem(text) {
  const keywords = ['decline', 'wish', 'prefer'];
  return keywords.some(keyword => text.includes(keyword));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkItems') {
    autoCheckItems();
    sendResponse({ message: 'Items checked' });
  }
});
