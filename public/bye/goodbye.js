var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var script = document.createElement('script');
script.src = 'https://malsup.github.io/jquery.form.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

initChat();
let data;
async function initChat() {
  const response = await fetch('/initBot');
  data = await response.json();
  console.log("data:  ");
  console.log(data);
  document.getElementById("avatarArt").src = data.imageSource;
  document.getElementById("avatarModal").src = data.imageSource;
  document.getElementById("titleModal").textContent = data.title;
  console.log('data.abstract');
  console.log(data.abstract);
  const txtHim = document.createElement('li');
  txtHim.className = "him"
  txtHim.textContent = "Welcome to ChatArt";
  document.getElementById("chatWrapper").append(txtHim);
}

var input = document.getElementById("myInput");
input.addEventListener("keypress", async function (event) {
  if (event.key === "Enter" && input.value != "") {
    event.preventDefault();
    const txtMe = document.createElement('li');
    txtMe.className = "me"
    txtMe.textContent = input.value;
    document.getElementById("chatWrapper").append(txtMe);
    await post('http://localhost:8001', { question: input.value, context: data.abstract, image: data.imageSource });
    input.value = "";
  }
});

async function sendMsg() {
  if (input.value != "") {
    const txtMe = document.createElement('li');
    txtMe.className = "me"
    txtMe.textContent = input.value;
    document.getElementById("chatWrapper").append(txtMe);
    await post('http://localhost:8001', { question: input.value, context: data.abstract, image: data.imageSource });
    input.value = "";
  }
}
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
async function post(path, params, method = 'post') {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  let form = document.getElementById('myform');
  for (const key in params) {
    form[key].value = params[key];
  }
  SubForm('#myform', path);
}

function SubForm(formname, url) {
  $.ajax({
    url: url,
    type: 'post',
    data: $(formname).serialize(),
    success: function (e) {
      console.log(e);
      let txtHim = document.createElement('li');
      txtHim.className = "him";
      txtHim.textContent = e.answer;
      let messaggi = document.getElementById("chatWrapper");
      messaggi.append(txtHim);
      console.log(messaggi.scrollTop);
      console.log(messaggi.scrollHeight);
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
      console.log(messaggi.scrollTop);
      messaggi.scrollTo(0, messaggi.scrollHeight);
    }
  });
}


