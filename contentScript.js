console.log('contentScript.js loaded');

function autoCheckItems() {
  // Normal

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectElements = document.querySelectorAll('select');

  // Iterate over checkboxes
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];

    const labelText = checkbox.parentNode.innerText.toLowerCase();

    // If the checkbox label contains the word "decline", check it
    if (shouldCheckItem(labelText)) {
      checkbox.checked = true;
    }
  }

  // Iterate over select elements
  for (let i = 0; i < selectElements.length; i++) {
    const selectElement = selectElements[i];

    for (let j = 0; j < selectElement.options.length; j++) {
      const optionText = selectElement.options[j].text.toLowerCase();

      if (shouldCheckItem(optionText)) {
        selectElement.selectedIndex = j;
        break;
      }
    }
  }


  // Special select
  const selects = document.querySelectorAll('.select2-chosen');



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
