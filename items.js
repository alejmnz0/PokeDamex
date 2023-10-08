$(document).ready(function () {
    cargarItems(1);

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


    function cargarItems(page) {
        var limit = 20;
        var offset = (page - 1) * limit;

        $.ajax({
            url: `https://pokeapi.co/api/v2/item?limit=${limit}&offset=${offset}`,
            type: 'GET'
        }).done(function (resp) {
            var listaItems = resp.results;
            $('#lista-items').empty();

            listaItems.forEach(function (item) {
                $.ajax({
                    url: item.url,
                    type: 'GET'
                }).done(function (resp) {
                    var template = `
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
                    actualizarPaginado(page);
                });
            });
        });
    }

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

        if (actualPage === paginas) {
            $('#ultima').addClass('d-none');
        } else {
            $('#ultima').removeClass('d-none');
        }
    }


    $(document).on('click', '.pagination-item', function () {
        var page = parseInt($(this).text());
        cargarItems(page);
        actualizarPaginado(page);
    });

    $(document).on('click', '#anterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        if (currentPage > 1) {
            cargarItems(currentPage - 1);
            actualizarPaginado(currentPage - 1);
        }
    });
    
    $(document).on('click', '#posterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        var totalPages = parseInt($('.page-item:not(.disabled) .pagination-item').last().text());
        if (currentPage < totalPages) {
            cargarItems(currentPage + 1);
            actualizarPaginado(currentPage + 1);
        }
    });

    $(document).on('click', '#primera', function () {
            cargarItems(1);
            actualizarPaginado(1);
    });
    
    $(document).on('click', '#ultima', function () {
        var limit = 20;
        var items = 2110;
        var paginas = Math.ceil(items / limit);
            cargarItems(paginas);
            actualizarPaginado(paginas);
    });

});