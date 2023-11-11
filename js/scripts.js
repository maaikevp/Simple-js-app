
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

  // Add buttons to the Pokemon array

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
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

  // function showDetails(item) {
  //    pokemonRepository.loadDetails(item).then(function() {
  //      console.log(item);
  //      // showModal();
  //    });
  // }

  // MODAL PART

  let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {

    modalContainer.innerHTML = '';   // Clear all existing modal content

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal functionality (button etc)cx
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "Height of Pokemon: " + pokemon.height;

    let imageElement = document.createElement("img");
    // imageElement.setAttribute("src", img);
    // imageElement.setAttribute("width", "304");
    // imageElement.setAttribute("height", "228");
    imageElement.setAttribute("alt", "Pokemon image");
    imageElement.classList.add('modal-img'); //added later
    imageElement.src = pokemon.imageUrl;   //added later

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // CLOSING OF MODAL

  // Hide modal after clicking in surrounding area, only directly on the overlay

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  // // Hide modal function

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Close button of modal 

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // Escape press to close modal 

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // SHOW DETAILS - WITHOUT MODAL -TEST
  // function showDetails(item) {
  //   pokemonRepository.loadDetails(item).then(function() {
  //     console.log(item);
  //   });
  // }
      
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
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
