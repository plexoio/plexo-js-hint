/**
 * Note: the code can be improved by using jQuery & better async syntax as seen on:
 * https://github.com/plexoio/api-training/blob/main/index.html
 */

// API interaction STARTS

const API_KEY = 'y4FP_wupzW0R8uOFkBa6FtaF2mA'; // set it up
const API_URL = 'https://ci-jshint.herokuapp.com/api'; // set it up
const results_modal = new bootstrap.Modal(document.getElementById('resultsModal')); // bootstrap's method

document.getElementById('status').addEventListener('click', e => getStatus(e)); // interacting with the DOM
document.getElementById('submit').addEventListener('click', e => postForm(e)); // interacting with the DOM

// GET data

/**
 * FIRST: Function to make the request to the API
 * The 'e' parameter is not being used just yet
 */
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

/**
 * SECOND: Function to display the data from the API manipulating the DOM
 */
let displayModal = (data) => {
    let heading = 'API Key Status';
    let results = `<div>Your API key is valid until:</div>` // better as an HTML
    results += `<div class="key-status">${data.expiry}</div>` // += if too long, concatenate

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results; // innerHTML

    results_modal.show();
}

// POST data

/**
 * FIRST: POST function, sending data to the API to process for us
 */

async function postForm(e) {
    const form = new FormData(document.getElementById('checksform')); // capture all field & return an object

    const initiatePost = await fetch(API_URL, { // two parameters for posting, 'destination & code block'
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form // body of the request
    });
}


// DISPLAY returned data









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

/**
 *     // for (entry of form.entries()){
    //     console.log(entry);
    // }
 */