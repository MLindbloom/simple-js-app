let pokemonList = [];

pokemonList = [
    {
        name: 'Pikachu',
        height: 0.4, //meters
        type: ['Electric'],
        species: 'Mouse'
    },
    {
        name: 'Charizard',
        height: 1.7, //meters
        type: ['Fire', 'Flying'],
        species: 'Flame'
    },
    {
        name: 'Mew',
        height: 0.4, //meters
        type: ['Psychic'],
        species: 'New Species'
    }
]

// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 1.0)
//      {document.write(pokemonList[i].name + "  " + "(height: " + "  " +  pokemonList[i].height + ") " + "- Wow, that\'s big!"+ "<br>"); //if pokemon's height is over 1.0m print "Wow, that's big!"
//   } else {
//   document.write(pokemonList[i].name + "  " + "(height: " + "  " +  pokemonList[i].height + ") " + "<br>");}
//   }

pokemonList.forEach(function(pokemon) {
    if (pokemon.height > 1.0) {
        document.write(pokemon.name + '  ' + '(height:' + '  ' + pokemon.height + 'm) ' + '- Wow, that\'s big!' + '<br>'); //if pokemon's height is over 1.0m print "Wow, that's big!"
    }
    else {
        document.write(pokemon.name + '  ' + '(height:' + '  ' + pokemon.height + 'm) ' + '<br>');
    }
});