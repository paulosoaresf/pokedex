console.log('script');

const types = [
  'fire',
  'grass',
  'electric',
  'water',
  'ground',
  'rock',
  'fairy',
  'poison',
  'bug',
  'dragon',
  'psychic',
  'flying',
  'fighting',
  'normal',
];

const POKEMON_COUNT = 4;

const cardHTML = `
<div class="card" id ="card-{id}">
<div class="favorite">
  <button class="favorite" data-id={id}>
  </button>
</div>
<div class="title">
  <h2>{name}</h2>
  <small># {id}</small>
</div>
<div class="img bg-{type}">
  <img
    src="https://pokeres.bastionbot.org/images/pokemon/{id}.png"
    alt=""
  />
</div>
<div class="type {type}">
  <p>{type}</p>
</div>
</div>
`;

const cards = document.querySelector('.cards');

const getType = (data) => {
  const apiTypes = data.map((type) => type.type.name);
  // console.log(apiTypes);
  const type = types.find((type) => apiTypes.indexOf(type) > -1);
  return type;
};

const fetchPokemon = async (number) => {
  if (!number === undefined) return;
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;

  const response = await fetch(url).then((response) => response.json());
  // console.log(response);

  const { id, name, types } = response;
  // console.log(id, name, types);

  const type = getType(types);

  return { id, name, type };
};

const customReplacer = (text, source, destination) => {
  const regex = new RegExp(source, 'gi');
  return text.replace(regex, destination);
};

const createCard = (pokemon) => {
  const { id, name, type } = pokemon;
  let newCard = customReplacer(cardHTML, `\{id\}`, id);
  newCard = customReplacer(newCard, `\{name\}`, name);
  newCard = customReplacer(newCard, `\{type\}`, type);

  cards.innerHTML += newCard;
};

const fetchPokemons = async () => {
  for (let index = 1; index <= POKEMON_COUNT; index++) {
    const pokemon = await fetchPokemon(index);
    // console.log(pokemon);
    createCard(pokemon);
  }
  
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


  const favButtons = document.querySelectorAll('button.favorite');
  favButtons.forEach((button, index) => {
    const buttonId = index+1;
    if(favorites.indexOf(buttonId.toString()) > -1){
      button.classList.add('fav');
    }

    button.addEventListener('click', setFavorite);
  })
};

const setFavorite = (e) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const pokeId = e.target.dataset.id;
  const button = e.target;
  const index = favorites.indexOf(pokeId);

  console.log(button);
  
  if(index == -1){
    favorites.push(pokeId);
    button.classList.add('fav');
  } else {
    favorites.splice(index,1);
    button.classList.remove('fav');
  } 
  localStorage.setItem('favorites', JSON.stringify(favorites));

};

fetchPokemons();