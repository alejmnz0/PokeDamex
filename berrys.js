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
        url: ' https://pokeapi.co/api/v2/berry?limit=500',
        type: 'GET'
    }).done(function (resp) {
        var listaBerry = resp.results;
        listaBerry.forEach(function (berry) {

            $.ajax({
                url: berry.url,
                type: 'GET'
            }).done(function (resp) {

                $.ajax({
                    url: resp.item.url,
                    type: 'GET'
                }).done(function (resp2) {

                    template = `
                            <div class="col-auto mx-2">
                            <button class="btn btn-view-berry"  itemid="${resp.id}">
                                <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                                <p class="mx-4">Nº-${resp.id}</p>
                                    <img class="card-img-top" src="${resp2.sprites.default}"
                                        alt="Card image cap">
                                    <div class="card-body row m-0" style="background-color: #B2B2B2">
                                        <h6 class="card-title col-9">${berry.name}</h6>
                                        </div>
                                    </div>
                                </button>
                            </div>`

                    $('#lista-berrys').append(template);

                });
            });
        });
    });

    $(document).on('click', '.btn-view-berry', function () {
        var itemId = $(this).attr('itemid');
        $.ajax({
            url: `https://pokeapi.co/api/v2/berry/${itemId}`,
            type: 'GET',
        }).done(function (response) {
            $.ajax({
                url: response.item.url,
                type: 'GET'
            }).done(function (response2) {

                $('#berry_name').text(response.name);
                $('#berry').attr("src", response2.sprites.default);
                $('#descripcion').text(response2.flavor_text_entries[0].text);
                $('#cost').text(response2.cost);
                $('#category').text(response2.category.name);
                $('#item_detail_modal').modal('show');
            });
        });
    });
});