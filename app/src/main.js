const Editor = require('./editor.js');
const Vue = require('vue');
const Uikit = require('uikit');
const axios = require('axios');

window.editor = new Editor();

window.vue = new Vue({
    el: '#app',
    data: {
        showLoader: true,
        page: 'index.html',
        'pageList': [],
        'backupList': [],

        meta: {
            title: '',
            description: '',
            keywords: ''
        },

        auth: false,
        password: '',
        loginError: false,
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
                this.meta = window.editor.metaEditor.getMeta();
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
                .get('./backups/backups.json')
                .then(response => {
                    this.backupList = response.data.filter((backup) => {
                        return (backup.page === this.page);
                    });
                })
        },

        restoreBackup(backup) {
            Uikit.modal
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
                    this.openPage(this.page);
                });
        },

        applyMeta() {
            window.editor.metaEditor.setMeta(this.meta.title, this.meta.keywords, this.meta.description);
        },

        login() {
            if (this.password.length > 5) {
                axios
                    .post('./api/login.php', {
                        password: this.password
                    })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.auth === true) {
                            this.auth = true;
                            this.start();
                        } else {
                            this.loginError = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                this.loginError = true;
            }
        },

        logout() {
            axios
                .get('./api/log_out.php')
                .then(() => {
                    window.location.replace('/');
                });
        },

        start() {
            this.openPage(this.page);
            this.updatePageList();
            this.loadBackupList();
        },

        enableLoader() {
            this.showLoader = true;
        },

        disableLoader() {
            this.showLoader = false;
        },

        errorNotification(msg) {
            Uikit.notification({message: msg, status: 'danger'});
        },
    },
    created() {
        axios
            .get('./api/check_auth.php')
            .then(res => {
                // this.auth = res.data.auth;

                if (res.data.auth === true) {
                    this.auth = true;
                    this.start();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});
