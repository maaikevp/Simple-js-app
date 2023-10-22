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

  console.log(pokemonRepository.getAll());


  pokemonRepository.add({ name: 'Pikachu', height: 0.4 , type: "electro" });
  console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } 