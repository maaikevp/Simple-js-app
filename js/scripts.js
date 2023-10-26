//IIFE including functions getAll and add

let pokemonRepository = (function() {
    let repository = [
      { name: "vulpix", height: 2, type: "fire" },
      { name: "lapras", height: 8, type: ["water", "ice"] },
      { name: "skitty", height: 2, type: ["normal"]
      }];
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
      ) {
        repository.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
      return repository;
    }
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon); 
      
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  
  pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
  
  console.log(pokemonRepository.getAll());
  
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });


// add EventListener

// button.addEventListener('click', function (event) {
//     console.log(event)
// });

// button.addEventListener('click', showDetails(pokemon));