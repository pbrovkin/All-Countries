let container = document.querySelector('.countries-container');

generateCountries(countries);


document.querySelector('input').oninput = function () {
    document.getElementById('error').textContent = '';
    main();
}

document.getElementById('reverse').onclick = function () {
    let displayedCountries = document.getElementsByClassName('country-block').length;
    container.textContent = '';
    if (displayedCountries === countries.length) {
        generateCountries(countries.reverse());
    } else {
        generateCountries(filtered.reverse());
    }
}


function main() {
    container.textContent = '';

    let inputVal = document.getElementById('input').value;

    let searchBy = document.getElementById('search-values').value;

    let searchParam = document.getElementById('search-params').value;

    checkInputVal(inputVal);

    if (searchParam === 'start-letters') {
        generateCountries(startsWithVal(searchBy, inputVal));
    } else if (searchParam === 'includ-letters') {
        generateCountries(includesVal(searchBy, inputVal));
    }
}



function generateCountries(arr) {
    arr.forEach((country) => {
        let block = document.createElement('div');
        block.className = 'country-block';
        block.innerHTML = `
        <div><img src="${country.flag}" alt="flag"></div>
        <div class="country-data">
            <div>Name: ${country.name}</div>
            <div>Capital: ${country.capital}</div>
            <div>Languages: ${country.languages}</div>
            <divn>Population: ${country.population}</div>
        </div>`;
        document.querySelector('.countries-container').append(block);
    });
    searchResults(arr);
}

let filtered = [];

function startsWithVal(par, val) {
    switch (par) {
        case 'name':
            filtered = countries.filter(country => country.name.toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'capital':
            filtered = countries.filter(country => country.capital.toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'language':
            filtered = countries.filter(country => country.languages[0].toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'population':
            filtered = countries.filter(country => country.population >= Number(val));
            break;
    }
    return filtered;
}


function includesVal(par, val) {
    switch (par) {
        case 'name':
            filtered = countries.filter(country => country.name.toLowerCase().includes(val.toLowerCase()));
            break;
        case 'capital':
            filtered = countries.filter(country => country.capital.toLowerCase().includes(val.toLowerCase()));
            break;
        case 'language':
            filtered = countries.filter(country => country.languages.join().includes(val.toLowerCase()));
            break;
        case 'population':
            filtered = countries.filter(country => country.population <= Number(val));
            break;
    }
    return filtered;
}

function itemsToLowerCase(item) {
    return item.toLowerCase();
}


function searchResults(arr) {
    if (arr.length === 1) {
        document.getElementById('results').innerHTML = `${arr.length} country found`;
    } else {
        document.getElementById('results').innerHTML = `${arr.length} countries found`;
    }
}

function checkInputVal(val) {
    let searchBy = document.getElementById('search-values').value;
    if (searchBy !== 'population') {
        let patt = /^[a-zA-Z\s]*$/;
        if (patt.test(val)) {
            return true;
        } else {
            document.getElementById('error').innerHTML = 'ERROR: Enter valid value';
        }
    } else {
        let patt = /([1-9][0-9]*)|0/;
        if (patt.test(val)) {
            return true;
        } else {
            document.getElementById('error').innerHTML = 'ERROR: Enter valid value';
        }
    }
}


