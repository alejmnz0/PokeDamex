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

    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon',
        type: 'GET'
    }).done(function (resp) {
        var listaPokemon = resp.results;
        listaPokemon.forEach(function (pok) {

            var template = `
            <div class="col-auto mx-2">
                <div class="card bg-dark text-light mt-5" style="width: 18rem;">
                    <img class="card-img-top" src="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                        alt="Card image cap">
                    <div class="card-body row">
                        <h4 class="card-title col-9">${pok.name}</h4>
                    </div>
                </div>
            </div>
            `;
            $('#submenu2').append(template);
        })
    })


})