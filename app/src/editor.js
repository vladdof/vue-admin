const axios = require('axios');
const DOMHelper = require('./dom-helper');

require('./iframe-load');

module.exports = class Editor {

    constructor() {
        this.iframe = document.querySelector('iframe');
    }

    open(page) {
        this.current_page = page;

        axios
            .get('../' + page)
            .then((res) => DOMHelper.parseStrToDom(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDomToStr)
            .then((html) => axios.post('./api/save_temp_page.php', { html }))
            .then(() => this.iframe.load('../temp.html'))
            .then(() => this.enableEditing())
    }

    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll('text-editor').forEach((element) => {
            element.contentEditable = true;
            element.addEventListener('input', () => {
                this.onTextEdit(element);
            })
        })
    }

    onTextEdit(element) {
        const id = element.getAttribute('nodeId');
        this.virtualDom.body.querySelector(`[nodeId="${id}"]`).innerHTML = element.innerHTML;
    }

    save() {
        const new_dom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(new_dom);
        const html = DOMHelper.serializeDomToStr(new_dom);

        axios.post('./api/save_page.php', { pageName: this.current_page, html })
    }

}
