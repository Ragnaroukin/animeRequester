export let result;
const data = null;
const xhr = new XMLHttpRequest();
const form = document.getElementById('form');
let url;
let isOneLine;
//gestion des evenements
form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    let nom = fd.get('nom');
    let classement = fd.get('classement');
    let id = fd.get('id');
    if (nom) {
        url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + nom;
        isOneLine = false;
    }
    if (classement) {
        url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + classement;
        isOneLine = true;
    }
    if (id) {
        url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + id;
        isOneLine = true;
    }
    xhr.open('GET', url);
    xhr.setRequestHeader('x-rapidapi-key', '83e099eae4msh95fcf898d140624p1dcfdejsn9577d139c852');
    xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

    xhr.send(data);
});

const promise = new Promise((resolve, reject) => {
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.status);
            }
        }
    };
});

promise
    .then(res => {
        if(isOneLine)
            result = {"data" : res.json()};
        else
            result = res.json();
        console.log(result);
    })
    .catch(err => {
        console.log(url);
        console.error("Erreur:", err);
    });
