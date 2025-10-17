const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

sessionStorage.clear();

const nom = document.getElementById('nom');
const id = document.getElementById('id');
const classement = document.getElementById('classement');
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
xhr.setRequestHeader('x-rapidapi-key', '1be4fdd298msh8dc37149279e2acp1ec290jsn6626a55c72d2');
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');
xhr.send();

const container = document.getElementById("genre");

let sun = document.getElementById("sun");

if (sessionStorage.getItem("mode") === "clair") {
    sun.classList.remove("fa-sun");
    sun.classList.add("fa-moon");
    document.documentElement.style.setProperty('--couleur1', 'rgb(66, 66, 66)');
    document.documentElement.style.setProperty('--couleur2', '#f8f9fa');
}
else {
    sun.classList.remove("fa-moon");
    sun.classList.add("fa-sun");
    document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
    document.documentElement.style.setProperty('--couleur2', 'rgb(66, 66, 66)');
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
    for (let j = 0; j < container.children.length; j++)
        container.children[j].addEventListener('input', e => {
            listeGenre.push(e.target.name);
            sessionStorage.setItem("genre", listeGenre);
        });
}

sun.addEventListener("click", function () {
    if (sun.classList.contains("fa-sun")) {
        sun.classList.remove("fa-sun");
        sun.classList.add("fa-moon");
        document.documentElement.style.setProperty('--couleur1', 'rgb(66, 66, 66)');
        document.documentElement.style.setProperty('--couleur2', '#f8f9fa');
        sessionStorage.setItem("mode", "clair");
    } else {
        sun.classList.remove("fa-moon");
        sun.classList.add("fa-sun");
        document.documentElement.style.setProperty('--couleur1', '#f8f9fa');
        document.documentElement.style.setProperty('--couleur2', 'rgb(66, 66, 66)');
        sessionStorage.setItem("mode", "sombre");
    }
});

nom.addEventListener('input', ()=>{
    if(nom.value === '')
        id.disabled =  classement.disabled = false;
    else
        id.disabled =  classement.disabled = true;
});

id.addEventListener('input', ()=>{
    if(id.value === '')
        nom.disabled =  classement.disabled = false;
    else
        nom.disabled =  classement.disabled = true;
});

classement.addEventListener('input', ()=>{
    if(classement.value === '')
        id.disabled =  nom.disabled = false;
    else
        nom.disabled =  id.disabled = true;
});
