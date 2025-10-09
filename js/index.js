const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {

    if (this.readyState === this.DONE) {
        // Parse la réponse JSON
        const data = JSON.parse(this.responseText);

        // Appelle ta fonction en lui passant la donnée
        create_genre(data);
    }
});

xhr.open('GET', 'https://anime-db.p.rapidapi.com/genre');
xhr.setRequestHeader('x-rapidapi-key', '1be4fdd298msh8dc37149279e2acp1ec290jsn6626a55c72d2');
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');
xhr.send();

const container = document.getElementById("genre");
let sombreButton = document.getElementById("darkmode");

function create_genre(data) {
    let dataGenres = data.map(item => item._id); // maintenant ça marche

    for (let i = 0; i < data.length; i++) {
        if (i % 2 === 0) {
            var group = document.createElement("div");
            group.className = "genre-group";
            container.appendChild(group);
        }

        var checkbox = document.createElement("div");
        checkbox.innerHTML = `
            <input type="checkbox" id="${dataGenres[i]}" name="${dataGenres[i]}" />
            <label for="${dataGenres[i]}">${dataGenres[i]}</label>
        `;
        group.appendChild(checkbox);
    }
}

sombreButton.addEventListener("click", function() {
    
      if (sombreButton.classList.contains("btn-dark")) {
        sombreButton.textContent = "Mode clair";
        sombreButton.classList.remove("btn-dark");
        sombreButton.classList.add("btn-light");
        document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
        document.documentElement.style.setProperty('--couleur2', 'rgb(66, 66, 66)');
      } else {
        sombreButton.textContent = "Mode sombre";
        sombreButton.classList.remove("btn-light");
        sombreButton.classList.add("btn-dark");
        document.documentElement.style.setProperty('--couleur1', 'rgb(66, 66, 66)'); // fond principal
        document.documentElement.style.setProperty('--couleur2', '#f8f9fa'); // éléments secondaires/transparents



      }
});
