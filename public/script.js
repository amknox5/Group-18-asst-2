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
        if (this.value != '') {
            return `
            <li class="filteredDisplay">
                <ul>
                    <li>
                        ${place.name}
                    </li>
                    <li>
                        ${place.category}
                    </li>
                    <address>
                        ${place.address_line_1}<br>
                        ${place.city}<br>
                        ${place.zip}<br>
                    </address>
                    <br>
                </ul>
            </li>
            `;
        }
    }).join('');
    
    searchInput.innerHTML = html;
    suggestions.innerHTML = html;
}

searchInput.addEventListener('keyup', displayMatches);