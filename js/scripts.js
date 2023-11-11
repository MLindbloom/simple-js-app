let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: ['Electric'], species: 'Mouse'},
    {name: 'Charizard', height: 1.7, type: ['Fire', 'Flying'], species: 'Flame'},
    {name: 'Mew', height: 0.4, type: ['Psychic'], species: 'New Species'}
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
        'name' in pokemon &&
        'height' in pokemon &&
        'type' in pokemon &&
        'species' in pokemon
        ){
        pokemonList.push(pokemon);
        }
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button')
        button.innertext= pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    };
   
    function showDetails(pokemon) {
        console.log(pokemon)
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'], species: 'Seed'});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});