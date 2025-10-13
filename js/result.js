const container = document.getElementById("containerMain");
//console.log(sessionStorage.getItem("result"));
let data = JSON.parse(sessionStorage.getItem("result")).data;
let dataIds = data.map(item => item._id);
let titles = data.map(item => item.title);
let images = data.map(item => item.image);
let genres = data.map(item => item.genres);
let synopsis = data.map(item => item.synopsis);

const size = (data.length % 3 === 0) ? data.length : data.length + (3 - data.length % 3);

for (let i = 0; i < size; i++) {
  if (i % 3 === 0) {
    var cardGroup = document.createElement("div");
    cardGroup.className = "card-group";
    container.appendChild(cardGroup);
  }
  if (i < data.length) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="${images[i]}" class="card-img-top card-internal" alt="${titles[i]}">
    <div class="card-body">
        <h5 class="card-title">${titles[i]}</h5>
        <div class="shortsynopsis">
            <p class="card-text">${synopsis[i].substring(0, 100)}...</p>
        </div>
        <p class="card-text"><small class="genre">Genres: ${genres[i].join(", ")}</small></p>
        <div class="synopsis-hover">
            <p class="card-text"><strong>Synopsis Complet:</strong></p>
            <p class="card-text">${synopsis[i]}</p>
        </div>
    </div>
`;
    cardGroup.appendChild(card);
  }
  else {
    var vide = document.createElement("div");
    vide.className = "card-body"; //fait une carte vide
    cardGroup.appendChild(vide);
  }
}

sombreButton.addEventListener("click", toggleSombreMode);


function toggleSombreMode() {
  if (sombreButton.classList.contains("btn-dark")) {
    sombreButton.textContent = "Mode clair";
    sombreButton.classList.remove("btn-dark");
    sombreButton.classList.add("btn-light");
    document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
    document.documentElement.style.setProperty('--couleur2', 'rgba(0.5, 0.5, 0.5, 0.5)');
    document.documentElement.style.setProperty('--couleur3', '#ffffff');
    document.documentElement.style.setProperty('--couleur4', 'rgb(233, 233, 233)');
    document.documentElement.style.setProperty('--couleur5', '#f8f9fa');
    document.documentElement.style.setProperty('--couleur6', 'black');

  } else {
    sombreButton.textContent = "Mode sombre";
    sombreButton.classList.remove("btn-light");
    sombreButton.classList.add("btn-dark");
    document.documentElement.style.setProperty('--couleur1', '#121212'); // fond principal
    document.documentElement.style.setProperty('--couleur2', 'rgba(255, 255, 255, 0.1)'); // éléments secondaires/transparents
    document.documentElement.style.setProperty('--couleur3', '#1e1e1e'); // zones de contenu
    document.documentElement.style.setProperty('--couleur4', '#2c2c2c'); // contrastes légers
    document.documentElement.style.setProperty('--couleur5', '#0d0d0d'); // arrière-plan sombre profond
    document.documentElement.style.setProperty('--couleur6', 'white'); // texte


  }
}

