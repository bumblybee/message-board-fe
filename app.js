axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

const getMsgs = async () => {
  const response = await axios.get("http://localhost:3000/threads");
  // Response is an object with data nested
  const msgs = response.data;

  return msgs;
};

const signupUser = async () => {
  const data = {
    username: "hankhill",
    email: "propane@gmail.com",
    password: "bobby",
    avatarUrl: "https://picsum.photos/31",
  };

  const res = await fetch("http://localhost:3000/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

const loginUser = async () => {
  const data = {
    email: "propane@gmail.com",
    password: "bobby",
  };
  const res = await axios.post("http://localhost:3000/users/login", data);

  return res;
};

const triggerPasswordReset = async (email) => {
  return await axios.post(`http://localhost:3000/users/password-reset`, {
    email,
  });
};

const resetPassword = async (token, newPassword) => {
  return await axios.post(
    `http://localhost:3000/users/password-reset/${token}`,
    { password: newPassword }
  );
};

const renderMessages = (msgs) => {
  let output = "";
  msgs.forEach((msg) => {
    output += `
         <li class="message">
            <div class="author-area">
              <div class="author-name">${msg.author.name}</div>
              <img
                class="avatar"
                src="${msg.author.avatarUrl}"
                alt=""
              />
            </div>
            <div class="message-area">
              <div class="action-dropdown">
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <span class="icon"> </span>
                    <span class="text">Edit</span>
                  </li>
                  <li class="dropdown-item">
                    <span class="icon"> </span>
                    <span class="text">Delete</span>
                  </li>
                </ul>
              </div>
              <div class="message-body">
               ${msg.body}
              </div>
            </div>
          </li>
          `;
  });
  document.querySelector("ul.thread").innerHTML = output;
};

const getTitle = () => {
  return "Thread About Stuff";
};

const dummyData = {
  names: ["Beth", "Sam", "Sadie", "Eric", "Emily", "Tom", "Egret"],
  // Return below as functions or they won't be unique
  randomName: function () {
    return Math.floor(Math.random() * this.names.length);
  },
  randomImage: function () {
    return Math.floor(Math.random() * 100 + 1);
  },
  id: function () {
    return allMessages.length + 1;
  },
  msgId: function () {
    return allMessages.length + 1;
  },
};

const createThreadMessage = () => {
  //Grab text from textarea
  const text = document.querySelector(".reply-textarea");

  // Create new message data passing in dummy data
  const newMsg = {
    author: {
      id: dummyData.id(),
      name: dummyData.names[dummyData.randomName()],
      avatarUrl: `https://picsum.photos/${dummyData.randomImage()}`,
    },
    msgId: dummyData.msgId(),
    createdAt: new Date("01/11/2020"),
    body: text.value,
  };

  // Clear textarea
  text.value = "";

  // Push new message to all messages
  allMessages.push(newMsg);

  // Re-render messages with new message in array
  renderMessages(allMessages);
};

document.querySelector(".reply-submit").addEventListener("click", (e) => {
  e.preventDefault();

  // const text = document.querySelector(".reply-textarea").value;
  // handleCreateThreadMessage(text);

  // Create new message on button click
  createThreadMessage();

  console.log(allMessages);
});

const init = () => {
  // signupUser()
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));
  // loginUser()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(err));
  getMsgs()
    .then((msgs) => {
      console.log(msgs);
      renderMessages(msgs);
    })
    .catch((err) => console.error(err));

  //  triggerPasswordReset("propane@gmail.com")
  //    .then((data) => console.log(data))
  //    .catch((err) => console.log(err));

  // const token = "e143685f4faaf7464904b0403e0d187e3569e675e9631302ad";
  // const newPassword = "345";
  // resetPassword(token, newPassword)
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));

  // Get thread title on init
  const threadTitle = getTitle();
  document.querySelector(".thread-title").textContent = threadTitle;
};

document.addEventListener("DOMContentLoaded", () => init());
