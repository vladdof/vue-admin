const Editor = require('./editor.js');
const Vue = require('vue');
const Uikit = require('uikit');

window.editor = new Editor();

window.onload = () => {
    // window.editor.open('index.html');
};

new Vue({
    el: '#app',
    data: {
        showLoader: true,
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.showLoader = false;
                    Uikit.notification({message: 'Успешное сохраниение.', status: 'success'});
                },
                () => {
                    this.showLoader = false;
                    Uikit.notification({message: 'Произошла ошибка сохранения.', status: 'danger'});
                }
            );
        }
    },
    created() {
        window.editor.open('index.html', () => {
            this.showLoader = false;
        });
    }
});

// const axios = require('axios');

// new Vue({
//     el: '#app',
//     data: {
//         'pageList': [],
//         'newPageName': '',
//     },
//     methods: {
//         deletePage(page) {
//             console.log(page);
//             axios
//                 .post('./api/delete_html_page.php', {
//                     'name': page
//                 })
//                 .then( () => this.updatePageList() )
//         },
//         createPage() {
//             axios
//                 .post('./api/create_new_html_page.php', {
//                     'name': this.newPageName
//                 })
//                 .then((response) => {
//                     console.log(response)
//                     this.updatePageList();
//                 })
//         },
//         updatePageList() {
//             axios
//                 .get('./api/')
//                 .then((response) => {
//                     this.pageList = response.data
//                 })
//         }
//     },
//     created() {
//         this.updatePageList();
//     },
// });

// const $ = require('jquery');

// function get_pahes_list() {
//     $('h1').remove();

//     $.get('./api', (data) => {
//         console.log(data);
//         data.forEach( function(element, index) {
//             $('body').append(`<h1>${element}</h1>`);
//         });
//     }, 'JSON');
// };

// get_pahes_list();

// $('.btn-create').on('click', () => {
//     $.post('./api/create_new_html_page.php', {
//         'name': $('.input-create').val()
//     }, (data) => {
//         get_pahes_list();
//     })
//     .fail(() => {
//         alert('Такая страница уже есть!');
//     });
// });

// $('.btn-delete').on('click', () => {
//     $.post('./api/delete_html_page.php', {
//         'name': $('.input-delete').val()
//     }, (data) => {
//         console.log(data);
//         get_pahes_list();
//     })
//     .fail(() => {
//         alert('Такой страницы нет!');
//     });
// });
