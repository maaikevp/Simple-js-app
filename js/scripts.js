//IIFE including functions getAll and add

let pokemonRepository = (function() {
    let repository = [
      { name: "vulpix", height: 2, type: ["fire"] },
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
      button.addEventListener("click", function () {
        showDetails(pokemon); // Call the showDetails 
      });
    }

    function showDetails(pokemon) {
      console.log("Name: " + pokemon.name);
      // console.log("Height: " + pokemon.height);
      // console.log("Types: " + pokemon.types.join(", "));
      // You can add more details as needed
    }


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



