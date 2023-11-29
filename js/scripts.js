//IIFE
let pokemonRepository = (function () {
   
    let pokemonList = [];

    //Pokemon database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
        typeof pokemon === 'object' &&
        'name' in pokemon && 
        'height' in pokemon
        // 'type' in pokemon &&
        // 'species' in pokemon
        ){
        pokemonList.push(pokemon);
        }
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button')
        button.innerText= pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    };
   
    function loadList() {
        return fetch(apiUrl).then(function (response)
{
            return response.json();
            }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            }).catch(function (e) {
                console.error(e);
            })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        showModal(pokemon);
        });
    }

    //Modal
    function hideModal() {
        let modal = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

    //Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //Add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'height: ' + pokemon.height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');



    if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
    }

    modalContainer.addEventListener('click', (e) => {
        let target =e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })

}

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});