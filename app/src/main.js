const $ = require('jquery');

function get_pahes_list() {
    $('h1').remove();

    $.get('./api', (data) => {
        console.log(data);
        data.forEach( function(element, index) {
            $('body').append(`<h1>${element}</h1>`);
        });
    }, 'JSON');
};

get_pahes_list();

$('.btn-create').on('click', () => {
    $.post('./api/create_new_html_page.php', {
        'name': $('.input-create').val()
    }, (data) => {
        get_pahes_list();
    })
    .fail(() => {
        alert('Такая страница уже есть!');
    });
});

$('.btn-delete').on('click', () => {
    $.post('./api/delete_html_page.php', {
        'name': $('.input-delete').val()
    }, (data) => {
        console.log(data);
        get_pahes_list();
    })
    .fail(() => {
        alert('Такой страницы нет!');
    });
});
