$(document).ready(function () {
    cargarPokemon(1);

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
    function cargarPokemon(page) {
        var limit = 20;
        var offset = (page - 1) * limit;

        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
            type: 'GET'
        }).done(function (resp) {
            var listaPokemon = resp.results;
            $('#lista-personajes').empty();

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
                    actualizarPaginado(page);
                });
            });
        });
    }

    

    $(document).on('click', '.btn-view-pokemon', function () {
        var pokemonId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
            type: 'GET',
        }).done(function (response) {

            $('#pokemon_name').text(response.name);

            $('#sprite').attr("src", response.sprites.front_default);

            //ataque máximo es 200
            $("#attack").text(response.stats[1].base_stat);
            //hace que la barra trabaje con valores de 0 a 200
            var width = (response.stats[1].base_stat / 200) * 100;
            $("#attack").css("width", width + "%");
            //defensa máxima es 100
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


    function actualizarPaginado(actualPage) {
        var limit = 20;
        var pokemons = 1292;
        var paginas = Math.ceil(pokemons / limit);
        var paginasVisibles = 4;

        var templatePaginado = '';


        var inicioPaginas = Math.max(1, actualPage - Math.floor(paginasVisibles / 2));
        var finPaginas = Math.min(paginas, inicioPaginas + paginasVisibles - 1);

        if (inicioPaginas > 1) {
            templatePaginado += `<li class="page-item" id="anterior"><a class="page-link" href="#">&#60;</a></li>`;
        }
    
        if (inicioPaginas > 2) {
            templatePaginado += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }

        for(var i = inicioPaginas; i <= finPaginas; i++) {
            i===actualPage
            ? templatePaginado += `<li class="page-item active"><span class="page-link pagination-item">${i}</span></li>`
            : templatePaginado += `<li class="page-item"><a class="page-link pagination-item" href="#">${i}</a></li>`

        }

        if (finPaginas < paginas - 1) {
            templatePaginado += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    
        if (finPaginas < paginas) {
            templatePaginado += `<li class="page-item" id="posterior"><a class="page-link" href="#">&#62;</a></li>`;
        }

        $('#pagination').empty();
        $('#pagination').append(templatePaginado);

        if (actualPage === 1) {
            $('#primera').addClass('d-none');
        } else {
            $('#primera').removeClass('d-none');
        }

    // Mostrar u ocultar botón "Última"
        if (actualPage === paginas) {
            $('#ultima').addClass('d-none');
        } else {
            $('#ultima').removeClass('d-none');
        }
    }


    $(document).on('click', '.pagination-item', function () {
        var page = parseInt($(this).text());
        cargarPokemon(page);
        actualizarPaginado(page);
    });

    $(document).on('click', '#anterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        if (currentPage > 1) {
            cargarPokemon(currentPage - 1);
            actualizarPaginado(currentPage - 1);
        }
    });
    
    $(document).on('click', '#posterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        var totalPages = parseInt($('.page-item:not(.disabled) .pagination-item').last().text());
        if (currentPage < totalPages) {
            cargarPokemon(currentPage + 1);
            actualizarPaginado(currentPage + 1);
        }
    });

    $(document).on('click', '#primera', function () {
            cargarPokemon(1);
            actualizarPaginado(1);
    });
    
    $(document).on('click', '#ultima', function () {
        var limit = 20;
        var pokemons = 1292;
        var paginas = Math.ceil(pokemons / limit);
            cargarPokemon(paginas);
            actualizarPaginado(paginas);
    });


});