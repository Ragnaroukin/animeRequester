const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

const genre = document.getElementById('genre');
const listeGenre = [];

xhr.addEventListener('readystatechange', function () {

    if (this.readyState === this.DONE) {
        // Parse la réponse JSON
        const data = JSON.parse(this.responseText);

        // Appelle ta fonction en lui passant la donnée
        create_genre(data);
    }
});

xhr.open('GET', 'https://anime-db.p.rapidapi.com/genre');
xhr.setRequestHeader('x-rapidapi-key', '83e099eae4msh95fcf898d140624p1dcfdejsn9577d139c852');
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');
xhr.send();

const container = document.getElementById("genre");
let sombreButton = document.getElementById("darkmode");

let sun = document.getElementById("sun");

if (sessionStorage.getItem("mode") === "clair") {
    sun.classList.remove("fa-sun");
    sun.classList.add("fa-moon");
    document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
    document.documentElement.style.setProperty('--couleur2', 'rgb(66, 66, 66)');
}
else {
    sun.classList.remove("fa-moon");
    sun.classList.add("fa-sun");
    document.documentElement.style.setProperty('--couleur1', 'rgb(66, 66, 66)');
    document.documentElement.style.setProperty('--couleur2', '#f8f9fa');
}

function create_genre(data) {
    let dataGenres = data.map(item => item._id);

    for (let i = 0; i < data.length; i++) {
        var checkbox = document.createElement("div");
        checkbox.innerHTML = `
            <input type="checkbox" id="${dataGenres[i]}" name="${dataGenres[i]}" />
            <label for="${dataGenres[i]}">${dataGenres[i]}</label>
        `;
        container.appendChild(checkbox);
    }

    for (let j = 0; j < genre.children.length; j++)
        genre.children[j].addEventListener('input', e => {
            listeGenre.push(e.target.name);
            sessionStorage.setItem("genre", listeGenre);
        })
}

sun.addEventListener("click", function () {
    if (sun.classList.contains("fa-sun")) {
        sun.classList.remove("fa-sun");
        sun.classList.add("fa-moon");
        document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
        document.documentElement.style.setProperty('--couleur2', 'rgb(66, 66, 66)');
        sessionStorage.setItem("mode", "clair");
    } else {
        sun.classList.remove("fa-moon");
        sun.classList.add("fa-sun");
        document.documentElement.style.setProperty('--couleur1', 'rgb(66, 66, 66)');
        document.documentElement.style.setProperty('--couleur2', '#f8f9fa');
        sessionStorage.setItem("mode", "sombre");
    }
});
