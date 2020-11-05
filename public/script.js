// Initializes the API data
const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

//empty array to fill with API data
const arr = []

//Fetch API data and fill it into array
fetch(api)
    .then((fromServer) => fromServer.json())
    .then(jsonFromServer => arr.push(jsonFromServer))
    .catch((err) => {
        console.log(err);
    });
    


const userInput = document.querySelector('.textentry');

userInput.addEventListener('change', async(e) => {
    e.preventDefault();
    const form = $(e.target).serializeArray();
} )