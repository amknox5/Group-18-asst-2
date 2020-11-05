/*function changeDataShape(array) {
    return array.reduce((list, item, i) => {
        const findCat = list.find((findItem) => findItem.label === item.category);
            list.push({
                name: item.name,
                address: item.address_line_1,
                label: item.category,
                zip: item.zip
            });
        return list;
    }, []);
}

function manipulateAndBind(incomingArray) {
    const arr = [] ;
    const api = loadData()
    arr.push(...api);

    const randomRestaurantArray = arr.map((item) => {
        const restaurant = incomingArray;
        return restaurant;
    });
    console.log(randomRestaurantArray)
    sessionStorage.setItem('shortRestaurantList', JSON.stringify(randomRestaurantArray));

    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantArray[0])}<br/><br/>`;
    $('.flex-outer').append(div);

    const div2 = document.createElement('div');
    const obj = {
        name: randomRestaurantArray[0][0].name,
        address: randomRestaurantArray[0][0].address_line_1,
        label: randomRestaurantArray[0][0].category,
        zip: randomRestaurantArray[0][0].zip
    };
    div2.innerHTML = `<h2>What we want</h2> <br/> <h4>A category, how many things are in the category</h4><pre><code class="language-javascript">${JSON.stringify(obj)}<br/><br/>`;

    $('.flex-outer').append(div2);
}

async function loadData() {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    return json;
    
}

async function mainThread() {
    console.log('Firing main thread');
    const manip = await loadData();
    console.log('Check session storage', sessionStorage);
    const restaurantData = JSON.parse(sessionStorage.getItem('shortRestaurantList'));
    manipulateAndBind(manip);
    console.table(restaurantData);
}

window.onload = mainThread;*/

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}, ${place.category}</span>
            </li>
            `;
    }).join('');
    searchInput.innerHTML = html;
}

const searchInput = document.querySelector('.UserInput');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);