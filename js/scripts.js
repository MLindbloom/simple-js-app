//IIFE
let pokemonRepository = (function () {
   
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
        }

        function addListItem(pokemon) {
            let element = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            listItem.classList.add('list-group-item');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#exampleModal');
            button.classList.add('btn', 'btn-primary');
            button.classList.add('button-class')
            listItem.append(button);
            element.append(listItem);
            button.addEventListener('click', () => {
              showDetails(pokemon);
            });
    };
   
    function loadList() {
        return fetch(apiUrl).then(function (response) {
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
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
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

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let titleElement = document.createElement("h1");
        titleElement.innerText = "Pokemon name" + ": " + pokemon.name;
        let contentElement = document.createElement("p");
        contentElement.innerText = "Pokemon height" + ": " + pokemon.height;
        let myImageFront = document.createElement("img");
        let myImageBack = document.createElement("img");
        myImageFront.src = pokemon.imageUrlFront;
        myImageBack.src = pokemon.imageUrlBack;
        $("#modal").click(function () {
          $(button).toggle("modal");
        });

        modalTitle.empty();
        modalBody.empty();
        modalTitle.append(titleElement);
        modalBody.append(contentElement);
        modalBody.append(myImageFront);
        modalBody.append(myImageBack);

}

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});