const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restArray = [];

fetch(api)
    .then(blob => blob.json())
    .then(data => restArray.push(...data));

function findMatches(wordToMatch, restArray) {
    return restArray.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restArray);
    const html = matchArray.map(place => {
        return `
            <li>
                <ul>
                    <li>
                        <span class="name">Name: ${place.name}</span>
                    </li>
                    <li>
                        <span class="name">Category: ${place.category}</span>
                    </li>
                    <li>
                        <span class="name">Address: ${place.address_line_1}</span>
                    </li>
                    <li>
                        <span class="name">City: ${place.city}</span>
                    </li>
                    <li>
                        <span class="name">Zipcode: ${place.zip}</span>
                        <br>
                    </li>
                </ul>
            </li>
            `;
    }).join('');
    
    searchInput.innerHTML = html;
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.UserInput');
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);