const container = document.getElementById("containerMain");
let data = JSON.parse(sessionStorage.getItem("result")).data;
let dataIds = data.map(item => item._id);
let titles = data.map(item => item.title);
let images = data.map(item => item.image);
let genres = data.map(item => item.genres);
let synopsis = data.map(item => item.synopsis);

const size = data.length + data.length % 3;

for (let i = 0; i < data.length; i++) {
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
    </div>`;
    cardGroup.appendChild(card);
  }
}

