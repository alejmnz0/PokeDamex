$(document).ready(function () {

    console.log("hola")
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
        })
    })

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
        })
    })

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
            // Lo último es abrir el modal
            $('#pokemon_detail_modal').modal('show');
        });

    });

    $(document).on('click', '.btn-view-pokemon', function () {
        var pokemonId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
            type: 'GET',
        }).done(function (response) {
            //BUscar en flavor text entries la descripcion
        });

    });
});