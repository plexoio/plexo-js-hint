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

// GET data & process it

/**
 * FIRST: Function to make the request to the API
 * The 'e' parameter is not being used just yet
 */
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // URL & validation
    const response = await fetch(queryString); // GET data
    const data = await response.json(); // parse JSON data to a JS object

    if (response.ok) {
        displayModal(data);
    } else {
        throw new Error(data.error);
    }
}

/**
 * SECOND: (GET) Function to display the data from the API manipulating the DOM
 */
const displayModal = (data) => {
    let heading = 'API Key Status';
    let results = `<div>Your API key is valid until:</div>` // better as an HTML
    results += `<div class="key-status">${data.expiry}</div>` // += if too long, concatenate

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results; // innerHTML

    results_modal.show();
}

// POST data & process it

/**
 * FIRST: POST function, sending/receiving data to/from the API
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
    const returnedData = await initiatePost.json(); // parse JSON data to a JS object

    if(initiatePost.ok){
        displayData(returnedData);
    }else {
        throw new Error(returnedData.error);
    }
}


/**
 * SECOND: (POST): Function to display the data from the API manipulating the DOM
 */

const displayData = (data) => {
    let heading = `JSHint Results on: ${data.file}`;
    if(data.total_errors === 0){
        results = `<div class="no_errors">All clean!</div>`;
    }else {
        results = `<div>Errors Found: <span class="error_counts">${data.total_errors}</span></div>`;

        for (let error of data.error_list){
            results += `<div> At line: <span class="line">${error.line}</span>, `
            results += `column: <span>${error.col}</span></div>`;
            results += `<div>Error message: <span class="error-message">${error.error}</span></div>`;
        }
    }
    
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

/**
 *     // for (entry of form.entries()){
    //     console.log(entry);
    // }
 */