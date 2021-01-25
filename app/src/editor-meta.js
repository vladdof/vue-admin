module.exports = class EditorMeta {
    constructor(virtualDom) {
        this.title = virtualDom.head.querySelector('title') || virtualDom.head.appendChild(virtualDom.createElement('title'));

        this.keywords = virtualDom.head.querySelector('meta[name="keywords"]');
        if (!this.keywords) {
            this.keywords = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            this.keywords.setAttribute('name', 'keywords');
        }

        this.description = virtualDom.head.querySelector('meta[name="description"]');
        if (!this.description) {
            this.description = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            this.description.setAttribute('name', 'description');
        }
    }

    getMeta() {
        return {
            title: this.title.innerHTML,
            description: this.description.getAttribute('content'),
            keywords: this.keywords.getAttribute('content'),
        }
    }

    setMeta(title, description, keywords) {
        this.title.innerHTML = title;
        this.description.setAttribute('content', description);
        this.keywords.setAttribute('content', keywords);
    }
}
