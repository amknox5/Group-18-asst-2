const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restArray = [];

fetch(api)
    .then(blob => blob.json())
    .then(data => restArray.push(...data));

function findMatches(wordToMatch, restArray) {
    return restArray.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.category.match(regex) || place.zip.match(regex)
    });
}
const searchInput = document.querySelector('.UserInput');
const suggestions = document.querySelector('.suggestions')

function displayMatches() {
    const matchArray = findMatches(this.value, restArray);
    const html = matchArray.map(place => {
        return `
            <li class="filteredDisplay">
                <ul>
                    <li>
                        <span class="name">${place.name}</span>
                    </li>
                    <li>
                        <span class="category">${place.category}</span>
                    </li>
                    <li>
                        <span class="address">${place.address_line_1}</span>
                    </li>
                    <li>
                        <span class="city">${place.city}</span>
                    </li>
                    <li>
                        <span class="zip">${place.zip}</span>
                        <br>
                    </li>
                </ul>
            </li>
            `;
    }).join('');
    
    searchInput.innerHTML = html;
    suggestions.innerHTML = html;
}



searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);