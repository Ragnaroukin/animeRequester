const data = null;
const req = new XMLHttpRequest();
const form = document.getElementById('form');
let url;
let isOneLine;
const selectionGenre = sessionStorage.getItem('genre').replaceAll(',', '%2C').replaceAll(' ', '%20');

//gestion des evenements
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(form);
        let nom = fd.get('nom');
        let classement = fd.get('classement');
        let id = fd.get('id');

        if (nom) {
            url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + nom;
            isOneLine = false;
            if(selectionGenre)
                url += '&genres='+selectionGenre;
        }
        if (classement) {
            url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + classement;
            isOneLine = true;
        }
        if (id) {
            url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + id;
            isOneLine = true;
        }
        req.open('GET', url);
        req.setRequestHeader('x-rapidapi-key', '83e099eae4msh95fcf898d140624p1dcfdejsn9577d139c852');
        req.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

        req.send(data);
    });

    const promise = new Promise((resolve, reject) => {
        req.withCredentials = true;

        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status >= 200 && req.status < 300) {
                    resolve(req.responseText);
                } else {
                    reject(req.status);
                }
            }
        };
    });


    promise
        .then(res => {
            if (isOneLine)
                result = "{\"data\":[" + res + "],\"meta\":{\"page\":1,\"size\":1,\"totalData\":10,\"totalPage\":1}}";
            else
                result = res;
            sessionStorage.setItem("result", result);
            window.location.href = "./html/result.html";
            alert(url);
        })
        .catch(err => {
            console.log(url);
            console.error("Erreur:", err);
        });
}

