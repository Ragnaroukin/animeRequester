const hr = new XMLHttpRequest();
hr.withCredentials = true;

hr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        // Parse la réponse JSON
        const data = JSON.parse(this.responseText);

        // Appelle ta fonction en lui passant la donnée
        create_genre(data);
    }
});

hr.open('GET', 'https://anime-db.p.rapidapi.com/genre');
hr.setRequestHeader('x-rapidapi-key', '589ffe3c27mshed298ed00c88ee4p150c58jsnec449e25eca6');
hr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');
hr.send();

const container = document.getElementById("genre");

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
