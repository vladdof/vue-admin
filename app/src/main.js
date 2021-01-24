const Editor = require('./editor.js');
const Vue = require('vue');
const Uikit = require('uikit');
const axios = require('axios');

window.editor = new Editor();


window.onload = () => {
    // window.editor.open('index.html');
};

new Vue({
    el: '#app',
    data: {
        showLoader: true,
        page: 'index.html',
        'pageList': [],
        'backupList': []
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.loadBackupList();
                    this.showLoader = false;
                    Uikit.notification({message: 'Успешное сохраниение.', status: 'success'});
                },
                () => {
                    this.showLoader = false;
                    Uikit.notification({message: 'Произошла ошибка сохранения.', status: 'danger'});
                }
            );
        },

        openPage(page) {
            this.page = page;
            this.loadBackupList();
            this.showLoader = true;
            window.editor.open(page, () => {
                this.showLoader = false;
            });
        },

        updatePageList() {
            axios
                .get('./api/page_list.php')
                .then((response) => {
                    this.pageList = response.data;
                })
        },

        loadBackupList() {
            axios
                .get('./backups/backup.json')
                .then(response => {
                    this.backupList = response.data.filter((backup) => {
                        return (backup.page === this.page);
                    });
                })
        },

        restoreBackup(backup) {
            UIkit.modal
                .confirm('Вы действительно хотите восстановить резервную копию?', {
                    labels: { ok: 'Восстановить', cancel: 'Отмена'}
                })
                .then(() => {
                    this.showLoader = true;
                    return axios
                        .post('./api/restore_backup.php', {
                            'file': backup.file,
                            'page': this.page,
                        })
                })
                .then(() => {
                    window.editor.open(this.page, () => {
                        this.showLoader = false;
                    });
                });
        }
    },
    created() {
        window.editor.open(this.page, () => {
            this.showLoader = false;
        });

        this.updatePageList();
        this.loadBackupList();
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
