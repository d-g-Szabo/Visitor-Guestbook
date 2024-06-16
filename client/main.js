const messageForm = document.querySelector("#messageForm");
const messageList = document.querySelector(".message-container");
const link = "https://visitor-guestbook-rmlb.onrender.com"; // This is the URL of the API http://localhost:8008

async function handleSubmitMessageForm(event) {
  event.preventDefault();
  console.log("Form submitted!");
  const formData = Object.fromEntries(new FormData(messageForm));
  //   console.log(formData);
  try {
    await fetch(`${link}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error submitting message", error);
  }
}

messageForm.addEventListener("submit", handleSubmitMessageForm);

// Fetch the messages from the API in the browser and display them on the page.

// Create a function to fetch the messages from the API
async function fetchMessages() {
  const response = await fetch(`${link}/messages`);
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
