
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal"); // bootstrap attr
    button.setAttribute("data-target", "#exampleModal"); // bootstrap attr
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.classList.add("btn"); // bootstrap
    button.classList.add("btn-primary"); // bootstrap
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }



  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          imageUrl: item.myImage
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }


  // MODAL PART

  function showModal(item) {
    let ModalBody = document.querySelector('.modal-body');
    let ModalTitle = document.querySelector('.modal-title');
    let modalHeader = document.querySelector('.modal-header');

    ModalTitle.innerHTML = '';
    ModalBody.innerHTML = '';

    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "Height of Pokemon: " + item.height;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("alt", "Pokemon image");
    imageElement.classList.add('modal-img'); //added later
    imageElement.src = item.imageUrl;   //added later

    ModalTitle.appendChild(titleElement);
    ModalBody.appendChild(contentElement);
    ModalBody.appendChild(imageElement);

  }

  // WITH MODAL
  function showDetails(pokemon) {
   pokemonRepository.loadDetails(pokemon).then(function () {
          showModal(pokemon);
  });
  }

     
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
