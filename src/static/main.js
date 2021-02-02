// @ts-check

const socket = new WebSocket("ws://localhost:8080/");

/**
 * Renders the all the messages in the UI when a message is recieved
 * 
 * @param {{data:string; [key: string]: any}} message 
 * @returns {void};
 */
socket.onmessage = (message) => {
  const { data } = message;
  const messages = JSON.parse(data);

  // Renders the messages in the UI
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  messages.forEach((item) => {
    const liElement = document.createElement("li");
    liElement.innerText = item;
    ul.appendChild(liElement);
  });
};

// Executed when the form is submitted
document.querySelector("form").addEventListener("submit", (event) => {
  // Prevents the form from submitting
  event.preventDefault();

  // Gets the value from the input element and deletes it after sending the message
  const inputElement = document.querySelector("input");
  const { value: word } = inputElement;
  socket.send(word);
  inputElement.value = "";
});
