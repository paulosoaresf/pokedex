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

const POKEMON_COUNT = 25;

const cardHTML = `
<div class="card" id ="card-{id}">
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
<button class="favorite" data-id={id}>
  <div class="heart"></div>
</button>
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
}

const createCard = (pokemon) => {
  const {id, name, type} = pokemon;
  let newCard = customReplacer(cardHTML, `\{id\}`, id);
  newCard = customReplacer(newCard, `\{name\}`, name);
  newCard = customReplacer(newCard, `\{type\}`, type);

  cards.innerHTML += newCard;
  
}

const fetchPokemons = async () => {
  for (let index = 1; index <= POKEMON_COUNT; index++) {
    const pokemon = await fetchPokemon(index);
    // console.log(pokemon);
    createCard(pokemon);
  }
};

fetchPokemons();
