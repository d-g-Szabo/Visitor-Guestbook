const messageForm = document.querySelector("#messageForm");
const messageList = document.querySelector(".message-container");

function handleSubmitMessageForm(event) {
  event.preventDefault();
  console.log("Form submitted!");
  // do something with the form data here

  const formData = Object.fromEntries(new FormData(messageForm));
  console.log(formData);
  fetch("http://localhost:8008/message", {
    method: "POST", // This is where we set the POST HTTP verb
    headers: {
      "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
    },
    body: JSON.stringify(formData),
  });
}

messageForm.addEventListener("submit", handleSubmitMessageForm);

// Fetch the messages from the API in the browser and display them on the page.

// Create a function to fetch the messages from the API
async function fetchMessages() {
  const response = await fetch("http://localhost:8008/messages");
  const messages = await response.json();
  return messages;
}

// Create a function to render the messages on the page
async function renderMessages() {
  const messages = await fetchMessages();
  console.log(messages);
  messageList.innerHTML = `<h3>${messages.length} Message(s)</h3>`;
  messages.forEach((message) => {
    const messageItem = document.createElement("div");
    messageItem.textContent = `${message.username} said: ${message.message}`;
    messageList.appendChild(messageItem);
  });
}

// Call the renderMessages function when the page loads
renderMessages();
