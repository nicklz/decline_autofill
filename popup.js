document.addEventListener('DOMContentLoaded', () => {
  // Get the checkItemsButton element
  const checkItemsButton = document.getElementById('checkButton');

  /**
   * handleClick
   * Event handler for the checkItemsButton click event.
   * Sends a message to the active tab to perform the 'checkItems' action.
   */
  const handleClick = () => {
    // Query for the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Send a message to the active tab
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkItems' }, (response) => {
        console.log('Response:', response);
      });
    });
  };

  // Add click event listener to the checkItemsButton
  checkItemsButton.addEventListener('click', handleClick);
});
