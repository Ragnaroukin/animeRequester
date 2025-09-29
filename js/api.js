const data = null;
const result = document.getElementById("result");
const xhr = new XMLHttpRequest();

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

    xhr.open(
        'GET',
        'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc'
    );
    xhr.setRequestHeader('x-rapidapi-key', '83e099eae4msh95fcf898d140624p1dcfdejsn9577d139c852');
    xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

    xhr.send(data);
});

promise
    .then(res => {
       result.innerHTML = res;
    })
    .catch(err => {
        console.error("Erreur:", err);
    });
