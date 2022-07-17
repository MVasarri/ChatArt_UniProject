var input = document.getElementById("myInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && input.value != "") {
    event.preventDefault();
    while (element = document.getElementById('resources')) {
      element.remove(); // Removes the div with the 'resources' id
    }
    getData(input.value);
    input.value = "";
  }
});

function searchData() {
  if (input.value != "") {
    while (element = document.getElementById('resources')) {
      element.remove(); // Removes the div with the 'resources' id
    }
    document.getElementById('resources');
    getData(document.getElementById('myInput').value);
    input.value = "";
  }
}

async function getData(textSearch) {
  let text = { search: textSearch };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(text) //sto specificatamente inviando un dato nel formato JSON, quindi è utile specificare un qualcosa chiamato headers
  };

  const response = await fetch('/api', options);
  const data = await response.json();
  console.log(Object.keys(data).length);
  console.log(data);

  data.forEach((item) => {
    console.log('print item: ' + item);
    console.log(item);
    const title = document.createElement('h5');
    title.textContent = item.title;
    title.className = "card-title text-light";

    const image = document.createElement('img');
    image.src = item.imageSource; //quando trasferiro nel database il datobase solo il path dell'immagine dovro usare quel path per poi daricarlo nel div
    image.alt = item.imageName;

    image.className = "card-img";
    image.loading = "lazy";

    const description = document.createElement('p');
    description.className = "card-text";
    description.textContent = item.description

    const link = document.createElement('a');
    link.href = "./bye/goodbye.html";
    link.onclick = async function (event) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item) //sto specificatamente inviando un dato nel formato JSON, quindi è utile specificare un qualcosa chiamato headers
      };

      const response = await fetch('/databot', options);

    };
    link.className = "btn btn-theme text-light";
    link.textContent = "ask a question";
    link.style = "background-color: #344853;";


    const cal = document.createElement('div');
    cal.id = "resources";
    cal.className = "container-fluid col";

    const card = document.createElement('div');
    card.className = "card rounded-4 text-center shadow-1";
    card.style = "margin: 0.9rem; color: white; background-color: #202C33;   height: 95%;";

    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header text-muted";
    cardHeader.style = "border-style: none;";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    cardHeader.append(title);
    cardBody.append(image, description);

    card.append(cardHeader, cardBody, link);
    cal.append(card);
    document.getElementById("content").append(cal);
  })
}