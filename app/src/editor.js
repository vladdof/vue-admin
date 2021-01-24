const axios = require('axios');
const DOMHelper = require('./dom-helper');
const EditorText = require('./editor-text');

require('./iframe-load');

module.exports = class Editor {

    constructor() {
        this.iframe = document.querySelector('iframe');
    }

    open(page, callback) {
        this.current_page = page;

        axios
            .get('../' + page + '?rnd=' + Math.random())
            .then((res) => DOMHelper.parseStrToDom(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDomToStr)
            .then((html) => axios.post('./api/save_temp_page.php', { html }))
            .then(() => this.iframe.load('../fsferggd.html'))
            .then((html) => axios.post('./api/delete_temp_page.php'))
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(callback)
    }

    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll('text-editor').forEach((element) => {
            const id = element.getAttribute('nodeId');
            const virtualElement = this.virtualDom.body.querySelector(`[nodeId="${id}"]`);
            new EditorText(element, virtualElement);
        })
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement('style');
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid green;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }

    save(onSucces, onError) {
        const new_dom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(new_dom);
        const html = DOMHelper.serializeDomToStr(new_dom);

        axios
            .post('./api/save_page.php', { pageName: this.current_page, html })
            .then(onSucces)
            .catch(onError);
    }

}
