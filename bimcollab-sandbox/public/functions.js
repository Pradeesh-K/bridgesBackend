
// Bind the functions to the buttons
document.getElementById("projectsButton").addEventListener('click', getProjects);
document.getElementById("topicsButton").addEventListener('click', getTopics);
document.getElementById("commentsButton").addEventListener('click', getComments);

// Setup the authentication header.
// This uses the token we got earlier and that we stored in the window.sessionStorage
const token = window.sessionStorage.getItem('bimcollab_token');
let headers = new Headers();
headers.append("Authorization", "Bearer " + token);

// Define callback functions for the button click
function getProjects(){

    // Define request options
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
 
    // Execute the request using the browsers fetch API
    fetch("https://playground.bimcollab.com/bcf/2.1/projects", requestOptions)
        .then(response => response.json())
        .then(result => {
            info = JSON.stringify(result, null, 4);

            // Display the result in the browser
            document.getElementById('projects').innerHTML = info;
        })
        .catch(error => console.log('error', error));
}

function getTopics(){
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://playground.bimcollab.com/bcf/2.1/projects/ca3f641f-f0ff-4552-8a12-c8538f738d0d/topics", requestOptions)
        .then(response => response.json())
        .then(result => {
            info = JSON.stringify(result, null, 4);
            document.getElementById('topics').innerHTML = info;
        })
        .catch(error => console.log('error', error));
}

function getComments(){
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://playground.bimcollab.com/bcf/2.1/projects/ca3f641f-f0ff-4552-8a12-c8538f738d0d/topics/6cde90c0-8e9e-400f-a573-e19c54ec4ffc/comments", requestOptions)
        .then(response => response.json())
        .then(result => {
            info = JSON.stringify(result, null, 4);
            document.getElementById('comments').innerHTML = info;
        })
        .catch(error => console.log('error', error));
}