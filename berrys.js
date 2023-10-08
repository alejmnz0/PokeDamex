$(document).ready(function () {
    cargarBerrys(1);

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


    function cargarBerrys(page) {
        var limit = 20;
        var offset = (page - 1) * limit;

        $.ajax({
            url: `https://pokeapi.co/api/v2/item?berry=${limit}&offset=${offset}`,
            type: 'GET'
        }).done(function (resp) {
            var listaBerrys = resp.results;
            $('#lista-berrys').empty();

            listaBerrys.forEach(function (berry) {
                $.ajax({
                    url: berry.url,
                    type: 'GET'
                }).done(function (resp2) {
                    var template = `
                            <div class="col-auto mx-2">
                            <button class="btn btn-view-berry"  itemid="${resp.id}">
                                <div class="card text-dark mt-5" style="width: 18rem; background-color: #ECECEC;">
                                <p class="mx-4">Nº-${resp2.id}</p>
                                    <img class="card-img-top" src="${resp2.sprites.default}"
                                        alt="Card image cap">
                                    <div class="card-body row m-0" style="background-color: #B2B2B2">
                                        <h6 class="card-title col-9">${berry.name}</h6>
                                        </div>
                                    </div>
                                </button>
                            </div>`

                    $('#lista-berrys').append(template);
                    actualizarPaginado(page);
                });
            });
        });
    }

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

    function actualizarPaginado(actualPage) {
        var limit = 20;
        var berrys = 64;
        var paginas = Math.ceil(berrys / limit);
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
        cargarBerrys(page);
        actualizarPaginado(page);
    });

    $(document).on('click', '#anterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        if (currentPage > 1) {
            cargarBerrys(currentPage - 1);
            actualizarPaginado(currentPage - 1);
        }
    });
    
    $(document).on('click', '#posterior', function () {
        var currentPage = parseInt($('.page-item.active .page-link').text());
        var totalPages = parseInt($('.page-item:not(.disabled) .pagination-item').last().text());
        if (currentPage < totalPages) {
            cargarBerrys(currentPage + 1);
            actualizarPaginado(currentPage + 1);
        }
    });

    $(document).on('click', '#primera', function () {
            cargarBerrys(1);
            actualizarPaginado(1);
    });
    
    $(document).on('click', '#ultima', function () {
        var limit = 20;
        var berrys = 64;
        var paginas = Math.ceil(berrys / limit);
            cargarBerrys(paginas);
            actualizarPaginado(paginas);
    });


});