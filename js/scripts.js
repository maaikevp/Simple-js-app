// let pokemonList = [
//     {name: "vulpix", height: 2, type: "fire"}, 
//     {name: "lapras", height: 8,  type: ["water", "ice"]}, 
//     {name: "skitty", height: 2,  type: ["normal"]}
//     ];

// let i=0; 

// for (;pokemonList[i];){
//     if (pokemonList[i].height >2) { text = pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - wow, that is big!" + "<br>";}
//     else {text = pokemonList[i].name + " (height: " + pokemonList[i].height + ")" +"<br>";}
//     i++;
//     // console.log(text);
//     document.write(text);
// }




//IIFE including functions getAll and add

let pokemonRepository = (function () {
    let pokemonList = [
    {name: "vulpix", height: 2, type: "fire"}, 
    {name: "lapras", height: 8,  type: ["water", "ice"]}, 
    {name: "skitty", height: 2,  type: ["normal"]}];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
      return {
      add: add,
      getAll: getAll
    };
  })();


// console.log(pokemonRepository.getAll());


// alternative to first part of first line below:  let pokemonList = pokemonRepository.getAll();

    pokemonRepository.getAll().forEach(function(pokemon) {
        if (pokemon.height >2){ //if pokemon's height is over 2m also print 'Wow that's big
        document.write(pokemon.name + ' (height: ' + pokemon.height + ' cm) - Wow, that\'s big!<br>');
        }else {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ' cm)<br>');
    }
});

// code to add loose entries to the Repository array

  pokemonRepository.add({ name: 'Pikachu', height: 0.4 , type: "electro" });
  console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } 