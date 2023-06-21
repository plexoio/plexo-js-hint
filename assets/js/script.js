/**
 * Note: the code can be improved by using jQuery & better async syntax as seen on:
 * https://github.com/plexoio/api-training/blob/main/index.html
 */

// API interaction STARTS

const API_KEY = 'y4FP_wupzW0R8uOFkBa6FtaF2mAs'; // set it up
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
 * Resolve issue of options: options - a comma separated list of options, which are outlined below. 
 */

function commaOptions(form) {
    let myOptions = [];
    for (let option of form.entries()) {
        if (option[0] === 'options') {
            myOptions.push(option[1]);
        }
    }
    form.delete('options'); // delete occurrences of 'options'
    form.append('options', myOptions.join()); // join() to convert back into a string 'commas' by default

    return form;
}

/**
 * FIRST: POST function, sending/receiving data to/from the API
 */

async function postForm(e) {
    const form = commaOptions(new FormData(document.getElementById('checksform'))); // capture all field & return an object

    const initiatePost = await fetch(API_URL, { // two parameters for posting, 'destination & code block'
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form // body of the request
    });
    const returnedData = await initiatePost.json(); // parse JSON data to a JS object

    if (initiatePost.ok) {
        displayData(returnedData);
    } else {
        displayPostError(returnedData);

        let errorInfo = `${returnedData.error}\nStatus: ${returnedData.status_code}`;
        errorInfo += `\nNumber: ${returnedData.error_no}`;
        let myErrors = new Error(`${errorInfo}`);
        console.log(myErrors);
    }
}

/**
 * Display errors after trying to POST & receive response
 */

function displayPostError(whatErrors) {

    const heading = 'JSHint Failed';
    results = `<div><li>Error: <strong>${whatErrors.error}</strong></li></div>`
    results += `<div><li>Status: <strong>${whatErrors.status_code}</strong></li></div>`
    results += `<div><li>Number: <strong>${whatErrors.error_no}</strong></li></div>`

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;

    results_modal.show();
}

/**
 * SECOND: (POST): Function to display the data from the API manipulating the DOM
 */

const displayData = (data) => {
    let heading = `JSHint Results on: ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">All clean!</div>`;
    } else {
        results = `<div>Errors Found: <span class="error_counts">${data.total_errors}</span></div>`;

        for (let error of data.error_list) {
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

/** Testing code
 *   // for (let entry of form.entries()){
    //     console.log(entry);
    // }
 */