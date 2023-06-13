
/**
 * Automatically checks off decline to answer inputs.
 */
function autoCheckItems() {
  // Normal checkboxes and select elements
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectElements = document.querySelectorAll('select');

  // Iterate over checkboxes
  for (const checkbox of checkboxes) {
    const labelText = checkbox.parentNode.innerText.toLowerCase();

    // If the checkbox label contains the special words.
    if (shouldCheckItem(labelText)) {
      checkbox.checked = true;
    }
  }

  // Iterate over select elements
  for (const selectElement of selectElements) {
    for (let j = 0; j < selectElement.options.length; j++) {
      const optionText = selectElement.options[j].text.toLowerCase();

      if (shouldCheckItem(optionText)) {
        selectElement.selectedIndex = j;
        break;
      }
    }
  }

  // Special select dropdowns
  const selects = document.querySelectorAll('.select2-chosen');

  for (const select of selects) {
    simulateClickOnCustomDropdown(select);
    const options = document.querySelectorAll('.select2-results li');

    for (const option of options) {
      const optionText = option.textContent.toLowerCase();
      if (shouldCheckItem(optionText)) {
        selectOption(option);
      }
    }

    closeCustomDropdown();
  }
}

/**
 * Opens a custom select dropdown.
 * @param {HTMLElement} dropdown - The custom select dropdown to open.
 */
function openCustomDropdown(dropdown) {
  const event = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  dropdown.dispatchEvent(event);
}

/**
 * Simulates a click on a custom select dropdown.
 * @param {HTMLElement} dropdown - The custom select dropdown to click.
 */
function simulateClickOnCustomDropdown(dropdown) {
  const event = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  dropdown.dispatchEvent(event);
}

/**
 * Checks if the given text contains any of the specified keywords.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if any keyword is found, false otherwise.
 */
function shouldCheckItem(text) {
  const keywords = ['decline', 'wish', 'prefer'];
  return keywords.some(keyword => text.includes(keyword));
}

/**
 * Closes custom select dropdowns.
 */
function closeCustomDropdown() {
  document.querySelectorAll('.select2-drop').forEach((result) => {
    result.remove();
  });
}

/**
 * Selects an option in a custom select dropdown.
 * @param {HTMLElement} option - The option to select.
 */
function selectOption(option) {
  const event = new MouseEvent('mouseup', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  option.dispatchEvent(event);
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkItems') {
    autoCheckItems();
    sendResponse({ message: 'Items checked' });
  }
});
