$(document).ready(function () {

    var limit = 20;

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
        url: ' https://pokeapi.co/api/v2/item?limit=500',
        type: 'GET'
    }).done(function (resp) {
        var listaItem = resp.results;
        listaItem.forEach(function (item) {

            $.ajax({
                url: item.url,
                type: 'GET'
            }).done(function (resp) {
                template = `
                        <div class="col-auto mx-2">
                        <button class="btn btn-view-item"  itemid="${resp.id}">
                            <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                            <p class="mx-4">Nº-${resp.id}</p>
                                <img class="card-img-top" src="${resp.sprites.default}"
                                    alt="Card image cap">
                                <div class="card-body row m-0" style="background-color: #B2B2B2">
                                    <h6 class="card-title col-9">${item.name}</h6>
                                    </div>
                                </div>
                            </button>
                        </div>`

                $('#lista-items').append(template);

            });
        });
    });

    $(document).on('click', '.btn-view-item', function () {
        var itemId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/item/${itemId}`,
            type: 'GET',
        }).done(function (response) {

            $('#item_name').text(response.name);

            $('#sprite').attr("src", response.sprites.default);
            $('#descripcion').text(response.flavor_text_entries[0].text);
            $('#cost').text(response.cost);
            $('#category').text(response.category.name);
            $('#item_detail_modal').modal('show');
        });

    });
});