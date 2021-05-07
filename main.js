'use strict';

function loadItem() {
    return fetch('data.json')
        .then(response => response.json())
        .then(json => json.items);
}

function displayItem(items) {
    const container = document.querySelector('.item-list');
    container.innerHTML = items.map(item => createHtmlString(item)).join('');
}

function createHtmlString(item) {
    return `
        <li class="item">
            <img src=${item.img} alt="상품 이미지"></img>
            <span>${item.gender},  ${item.size}</span>
        </li>
    `;
}

function setClickListener(items) {
    const logo = document.querySelector('.logo_img');
    const button = document.querySelector('.item-menu');

    logo.addEventListener('click', () => displayItem(items));
    button.addEventListener('click', (event) => filterItem(event, items));
}

function filterItem(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;

    console.log(event.target.dataset.key);
    console.log(event.target.dataset.value);

    if (key == null || value == null) {
        return;
    }

    updateItem(items, key, value);
    // displayItem(items.filter(item => item[key] === value));
}

function updateItem(items, key, value) {
    items.forEach(function(item, index) {

        const itemVisible = document.querySelector('.item-list').children[index];
        // console.log(item.dataset[key] + ", " + value);

        if(item[key] === value) {
            itemVisible.classList.remove('invisible');
        } else {
            itemVisible.classList.add('invisible');
        }
    });
}

loadItem()
    .then(items => {
        displayItem(items)
        setClickListener(items);
    }).catch(console.log)
