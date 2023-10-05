$(document).ready(function () {

    var limit = 20;

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
        url: 'https://pokeapi.co/api/v2/pokemon?limit=500',
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
                    </div>
                    `
                    : template = `
                <div class="col-auto mx-2">
                <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                    <p class="mx-4">Nº-${resp.id}</p>
                        <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.id}.png"
                            alt="Card image cap">
                            <div class="card-body row m-0" style="background-color: #B2B2B2">
                            <h6 class="card-title col-9">${pok.name}</h6>
                            <img class="col-4" src="img/${resp.types[0].type.name}.png" height="20" width="47" alt="pokemon type">
                        </div>
                    </div>
                </div>
                `

                $('#lista-personajes').append(template);

            });
        });
    });

});