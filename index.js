$(document).ready(function () {

    var limit = 20;
    var offset = 0;
    var pokemons = 1292;
    var paginas = Math.ceil(1292 / 20);

    $.ajax({
        url: 'https://pokeapi.co/api/v2/type',
        type: 'GET'
    }).done(function (resp) {
        var listaTipos = resp.results;
        listaTipos.forEach(function (tipo) {

            var template = `
            <li class="w-100">
            <a href="#" class="nav-link link-light"> <span
                    class="d-none d-sm-inline">${tipo.name}</span>
            </a>
            </li>`;
            $('#submenu1').append(template);
        });
    });

    $.ajax({
        url: 'https://pokeapi.co/api/v2/generation',
        type: 'GET'
    }).done(function (resp) {
        var listaGen = resp.results;
        listaGen.forEach(function (gen) {

            var template = `
            <li class="w-100">
            <a href="#" class="nav-link link-light"> <span
                    class="d-none d-sm-inline">${gen.name}</span>
            </a>
            </li>`;
            $('#submenu2').append(template);
        });
    });

    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=20',
        type: 'GET'
    }).done(function (resp) {
        var listaPokemon = resp.results;
        listaPokemon.forEach(function (pok) {

            $.ajax({
                url: pok.url,
                type: 'GET'
            }).done(function (resp) {
                var template;

                resp.types.length == 2
                    ? template = `
                    
                        <div class="col-auto mx-2">
                        <button class="btn btn-view-pokemon"  itemid="${resp.id}">
                            <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                            <p class="mx-4">Nº-${resp.id}</p>
                             <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.id}.png"
                                    alt="Card image cap">
                                <div class="card-body row m-0" style="background-color: #B2B2B2">
                                    <h6 class="card-title col-9">${pok.name}</h6>
                                    <img class="col-4" src="img/${resp.types[0].type.name}.png" height="20" width="47" alt="pokemon type">
                                    <img class="col-4" src="img/${resp.types[1].type.name}.png" height="20" width="47" alt="pokemon type">
                                    </div>
                                </div>
                            </button>
                        </div>
                    
                    `
                    : template = `
                    <div class="col-auto mx-2">
                        <button class="btn btn-view-pokemon"  itemid="${resp.id}">
                            <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                            <p class="mx-4">Nº-${resp.id}</p>
                             <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.id}.png"
                                    alt="Card image cap">
                                <div class="card-body row m-0" style="background-color: #B2B2B2">
                                    <h6 class="card-title col-9">${pok.name}</h6>
                                    <img class="col-4" src="img/${resp.types[0].type.name}.png" height="20" width="47" alt="pokemon type">
                                    </div>
                                </div>
                            </button>
                        </div>
                `

                $('#lista-personajes').append(template);

            });
        });
    });

    $(document).on('click', '.btn-view-pokemon', function () {
        var pokemonId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
            type: 'GET',
        }).done(function (response) {
            //busca y guanda el tipo del pokemon
            //specie1 = response.types[0].type.name;

            $('#pokemon_name').text(response.name);

            $('#sprite').attr("src", response.sprites.front_default);

            //ataque máximo es 200
            $("#attack").text(response.stats[1].base_stat);
            //Hace que la barra trabaje con valores de 0 a 200
            var width = (response.stats[1].base_stat / 200) * 100;
            $("#attack").css("width", width + "%");
            //defensa máximo es 100
            $("#defense").text(response.stats[2].base_stat);
            var width = (response.stats[2].base_stat / 200) * 100;
            $("#defense").css("width", width + "%");

            //hp máximo es 100
            $("#health").text(response.stats[0].base_stat);
            $("#health").css("width", response.stats[0].base_stat + "%");


            $("#speed").text(response.stats[5].base_stat);
            var width = (response.stats[5].base_stat / 200) * 100;
            $("#speed").css("width", width + "%");

            $("#SpecialAct").text(response.stats[3].base_stat);
            $("#SpecialAct").css("width", response.stats[3].base_stat + "%");

            $("#SpecialDef").text(response.stats[4].base_stat);
            $("#SpecialDef").css("width", response.stats[4].base_stat + "%");

            // Lo último es abrir el modal
            $('#pokemon_detail_modal').modal('show');
        });

    });

    $(document).on('click', '.btn-view-pokemon', function () {
        var pokemonId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
            type: 'GET',
        }).done(function (response) {
            $('#descripcion').text(response.flavor_text_entries[0].flavor_text);
        });
    });

    $(document).on('click', '.page-link', function () {
        $('').addClass("bg-black")

    });



});