/**
 * My god, this is a complete mess.
 *
 * I'll fix it later tho. xD
 */

function checkUsername() {
  const username = sessionStorage.getItem("_username");
  if (username) {
    const socket = new WebSocket("ws://localhost:8080/");
    const isFirstTime = true;

    return [username, socket, isFirstTime];
  } else {
    window.location.href = "http://localhost:3333/index.html";
  }
}

const [user, socket] = checkUsername();
let [, , isFirstTime] = checkUsername();

socket.onmessage = (message) => {
  const { data } = message;
  const messages = JSON.parse(data);
  const ul = document.querySelector("ul");

  if (!isFirstTime) {
    const liElement = document.createElement("li");
    const paragraphElement = document.createElement("p");

    const { username, message } = messages[messages.length - 1];

    paragraphElement.innerText = username;

    username === user ? liElement.setAttribute("class", "special") : null;
    liElement.innerText = message;
    liElement.appendChild(paragraphElement);

    ul.appendChild(liElement);
  } else {
    messages.forEach((message) => {
      const liElement = document.createElement("li");
      const paragraphElement = document.createElement("p");

      const { username, message: newMessage } = message;

      paragraphElement.innerText = username;

      username === user ? liElement.setAttribute("class", "special") : null;
      liElement.innerText = newMessage;
      liElement.appendChild(paragraphElement);

      ul.appendChild(liElement);
    });
    isFirstTime = false;
  }
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const inputElement = document.querySelector("input");
  const { value: message } = inputElement;
  socket.send(
    JSON.stringify({
      message,
      username: user,
    })
  );
  inputElement.value = "";
});
