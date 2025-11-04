import { LitElement, css, html, nothing } from 'lit'
import { classMap } from "lit/directives/class-map.js"
import { Task } from '@lit/task'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import prism from 'prismjs'

import { prismTheme } from './themes/prism-theme'
import { kodaTheme } from './themes/koda-theme'

export class KodaEmbed extends LitElement {
  static get properties() {
    return {
      height: { type: Number },
      selected: { type: String },

      _html_url: { state: true },
      _css_url: { state: true },
      _js_url: { state: true },

      _html_src: { state: true },
      _css_src: { state: true },
      _js_src: { state: true},

      iframeReady: { state: true },
    }
  }

  constructor() {
    super()
    this.iframeReady = false;
  }

  firstUpdated() {
    this.iframe = this.shadowRoot.querySelector('iframe');
    this.iframe.addEventListener('load', () => this.iframeReady = true)
  }

  fetchCodeUrls(e) {
    e.target.assignedElements({flatten: true}).map(slot => {
      if (slot.tagName === "CODE" && "code" in slot.dataset) {
        switch (slot.className) {
          case "language-html":
            this._html_url = slot.dataset.code
            break
          case "language-css":
            this._css_url = slot.dataset.code
            break
          case "language-js":
            this._js_url = slot.dataset.code
            break
        }
      }
    })
  }

  _htmlTask = new Task(this, {
    task: async ([src]) => {
      const response = await fetch(src)
      if (!response.ok) { throw new Error(response.status) }
      return response.text().then(text => this._html_src = text)
    },
    args: () => [this._html_url]
  })

  _cssTask = new Task(this, {
    task: async ([src]) => {
      const response = await fetch(src)
      if (!response.ok) { throw new Error(response.status) }
      return response.text().then(text => this._css_src = text)
    },
    args: () => [this._css_url]
  })

  _jsTask = new Task(this, {
    task: async ([src]) => {
      const response = await fetch(src)
      if (!response.ok) { throw new Error(response.status) }
      return response.text().then(text => this._js_src = text)
    },
    args: () => [this._js_url]
  })

  addTab(lang) {
    const classes = {
      active: this.selected === lang,
      "koda-tab": true,
      "koda-tab-html": lang === "html",
      "koda-tab-css": lang === "css",
      "koda-tab-js": lang === "js",
    }
    return html`<li @click=${() => this.selected = lang} class=${classMap(classes)}><a>${lang}</a></li>`
  }

  addBox(lang, content) {
    const classes = {
      active: this.selected === lang,
      "koda-box": true,
      "koda-box-html": lang === "html",
      "koda-box-css": lang === "css",
      "koda-box-js": lang === "js",
    }
    return html`
      <div class=${classMap(classes)}>
        <pre class="language-${lang}"><code class="language-${lang}">${content}</code></pre>
      </div>
      `
  }

  addResult() {
    const classes = {
      active: this.selected === "result",
      "koda-box": true,
      "koda-box-result": true
    }
    if (this._html_src && this._css_url && this._js_url && this.iframeReady) {
        const doc = this.iframe.contentWindow.document
        doc.open('text/html', 'replace')
        doc.write(`<!DOCTYPE html><html><head><link rel="stylesheet" href="${this._css_url}"></head><body>${this._html_src}<script src="${this._js_url}"></script></body></html>`)
        doc.close()
    }
    return html`
      <div class=${classMap(classes)}>
        <iframe width="100%" height="100%" frameborder="0" src="about:blank"></iframe>
      </div>
    `
  }

  addSpinner() {
    return html`<div class="koda-spinner"></div>`
  }

  addTabs() {
    return html`
      <ul class="koda-tabs">
        ${this._html_url ? this.addTab("html") : nothing}
        ${this._css_url ? this.addTab("css") : nothing}
        ${this._js_url ? this.addTab("js") : nothing}
        ${this.addTab("result")}
      </ul>
      `
  }

  addBoxes() {
    return html`
      <div class="koda-boxes">
        ${this._html_url ? this.addBox("html", this._htmlTask.render({complete: value => unsafeHTML(prism.highlight(value, prism.languages.html, "html"))})) : nothing}
        ${this._css_url ? this.addBox("css", this._cssTask.render({complete: value => unsafeHTML(prism.highlight(value, prism.languages.css, "css"))})) : nothing}
        ${this._js_url ? this.addBox("js", this._jsTask.render({complete: value => unsafeHTML(prism.highlight(value, prism.languages.javascript, "javascript"))})) : nothing}
        ${this.addResult()}
      </div>
      `
  }

  render() {
    return html`
      <slot @slotchange=${this.fetchCodeUrls}></slot>
      ${this.addSpinner()}
      ${this.addTabs()}
      ${this.addBoxes()}
    `
  }

  static styles = [
    kodaTheme,
    prismTheme
  ]
}

window.customElements.define('koda-embed', KodaEmbed)
