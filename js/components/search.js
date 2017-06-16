'use strict';

const Header = () => {
  const header = $('<header>').addClass('container');
  const row = $('<div>').addClass('row');
  const col = $('<div>').addClass('col s12 m12');
  const title = $('<h2 class="center-align">Pokédex</h2>');

  header.append(row);
  row.append(col);
  col.append(title);

  return header;
}

const Search = (update) => {
  const parent = $('<div>');
  const search = $('<div class="search"></div>');
  const container = $('<div class="container"></div>');
  const row = $('<div class="row"></div>');
  const col = $('<div class="col s12 header-col"></div>');
  const formGroup = $('<div class="form-group col s12 col m7 col l7"></div>');
  const icon = $('<i class="fa fa-search col s1" aria-hidden="true"></i>');
  const input = $('<input type="text" class="col s11 col m11" placeholder="Ingresa tu pokemón a buscar">');

  parent.append(search);
  search.append(container);
  container.append(row);
  row.append(col);
  col.append(formGroup);
  formGroup.append(icon);
  formGroup.append(input);

  input.on("keyup", (e) => {
    let pokemonsFounded = filterByName(state.pokemons.pokemon_entries,input.val())
    reRender(content, pokemonsFounded, update);
  });

  const collection = $('<div class="container"></div>');
  const content = $('<div class="row grid"></div>');
  collection.append(content);

  state.pokemons.pokemon_entries.map((e) => {
    content.append(Pokemon(e, update));

    return content;
  });

  parent.append(collection);
  return parent;

}

const Pokemon = (e, update) => {
  const col = $('<div class="col s12 m4 l3 xl2 gris-claro gris-text"></div>')
  const pokeName = $('<h6 class="bold">' + e.pokemon_species.name + '</h6>');
  const imgDiv = $('<div class="img-div"></div>');
  const img = $('<img src="http://serebii.net/art/th/' + e.entry_number + '.png"/>');
  const bottom = $('<div class="trapecio"></div>');
  const open = $('<a href="#modal1" class="icon pokebola"></a>');
  const data = $('<a href="#" class="icon data"></a>');
  const heart = $('<a href="#" class="icon heart"></a>');

  col.append(imgDiv);
  col.append(bottom);
  imgDiv.append(img);
  bottom.append(heart);
  bottom.append(data);
  bottom.append(open);
  bottom.append(pokeName);

  open.on('click',(event) => {
    event.preventDefault();
    state.selectedPokemon = e.entry_number;

    getJSON('http://pokeapi.co/api/v2/pokemon-species/' + state.selectedPokemon, (err, json) => {
      if (err) { return alert(err.message);}
      state.pokeSpecies = json;
      state.pokeName = state.pokeSpecies.name;
      state.description = state.pokeSpecies.flavor_text_entries[3].flavor_text;
    });

    getJSON('http://pokeapi.co/api/v2/pokemon/' + state.selectedPokemon, (err, json) => {
      if (err) { return alert(err.message);}
      state.pokeData = json;
      state.abilities = state.pokeData.abilities;
      state.height = state.pokeData.height + ' m';
      state.weight = state.pokeData.weight + ' kg';
      state.types = state.pokeData.types;
    });

    col.append(Modal());
    //update();

  });

  return col;
}

const Modal = (update) => {
  const modal = $('<div id="modal1" class="modal"></div>');
  const modalContent = $('<div class="modal-content"></div>');
  const title = $('<h6>Holi</h6>');
  const close = $('<a href="#!" class="modal-action modal-close icon close"></a>');

  modal.append(modalContent);
  modalContent.append(title);
  modalContent.append(close);

  return modal.modal();
}

const reRender = (content, pokemonsFounded, update) => {
  content.empty();
  pokemonsFounded.forEach((e) => {
    content.append(Pokemon(e,update));
  })
}
