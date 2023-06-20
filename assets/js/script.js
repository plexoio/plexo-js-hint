// Note: the code can be improved by using jQuery & better async syntax as seen on:
// https://github.com/plexoio/api-training/blob/main/index.html

const API_KEY = 'y4FP_wupzW0R8uOFkBa6FtaF2mA'; // set up
const API_URL = 'https://ci-jshint.herokuapp.com/api'; // set up
const results_modal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', e => getStatus(e)); // interacting with the DOM

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // URL & validation
    const response = await fetch(queryString); // GET data
    const data = await response.json(); // parse data to a JS object

    if (response.ok) {
        displayModal(data);
    } else {
        throw new Error(data.error);
    }
}

let displayModal = (data) => {
    let heading = 'API Key Status';
    let results = `<div>Your API key is valid until:</div>` // better as an HTML
    results += `<div class="key-status">${data.expiry}</div>` // += if too long, concatenate

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results; // innerHTML

    results_modal.show();
}

// The same but with jQuery

/**
 * $('status').click(function (e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();

    if(response.ok){
        console.log(data);
        console.log(data); // all object
        console.log(data.expiry); // expiry property in the object (known, documentation)
    }
});
 */