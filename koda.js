import prism from 'prismjs'
import './koda.css'

function createElement (tag, cls, id, root) {
  var el = document.createElement(tag)
  if (typeof cls === 'string') el.className = cls
  if (typeof id === 'string') el.id = id
  if (typeof root !== 'undefined') root.appendChild(el)
  return el
}

function formatCode (lang, data) {
  switch (lang) {
    case 'html':
      return data['html'] ? data.html : ''
    case 'css':
      return data['css'] ? (data.css.endsWith('.css') ? '<link rel="stylesheet" href="' + data.css + '">' : '<style>' + data.css + '</style>') : ''
    case 'js':
      return data['js'] ? (data.js.endsWith('.js') ? '<script src="' + data.js + '"></script>' : '<script>' + data.js + '</script>') : ''
    default:
      return ''
  }
}

function createIframe (cls, root, data = {}) {
  const html = formatCode('html', data)
  const css = formatCode('css', data)
  const js = formatCode('js', data)
  const iframe = createElement('iframe', cls, 0, root)
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.src = 'about:blank'
  iframe.style.overflow = 'hidden'
  iframe.setAttribute('frameborder', 0)
  iframe.contentWindow.document.open('text/html', 'replace')
  iframe.contentWindow.document.write('<!DOCTYPE html><html><head>' + css + '</head><body>' + html + js + '</body></html>')
  iframe.contentWindow.document.close()
  return iframe
}

function addTab (lang, tabs) {
  const tab = createElement('li', 'koda-tab koda-tab-' + lang, 0, tabs)
  const link = createElement('a', 0, 0, tab)
  link.dataset.toggle = lang
  link.setAttribute('href', '#')
  link.appendChild(document.createTextNode(lang))
  tabs.appendChild(tab)
}

function addResult (data, tabs, boxes) {
  addTab('result', tabs)
  createIframe('koda-result', createElement('div', 'koda-box koda-box-result', 0, boxes), data)
}

function addCode (lang, data, tabs, boxes) {
  if (typeof data[lang] !== 'undefined') {
    addTab(lang, tabs)
    const box = createElement('div', 'koda-box koda-box-' + lang, 0, boxes)
    const pre = createElement('pre', 0, 0, box)
    const code = createElement('code', 'language-' + lang, 0, pre)
    code.appendChild(document.createTextNode(data[lang]))
  }
}

function toggleTab (tab) {
  const root = tab.parentNode.parentNode
  const lang = tab.firstElementChild.dataset.toggle
  const box = root.querySelector('.koda-box-' + lang)
  const elements = Array.from(root.querySelectorAll('.koda-tabs, .koda-boxes, .koda-tab, .koda-box'))
  elements.map((element) => {
    element.classList.remove('active')
    element.classList.remove('result')
    element.classList.remove('html')
    element.classList.remove('css')
    element.classList.remove('js')
  })
  box.classList.add('active')
  box.parentNode.classList.add(lang)
  tab.classList.add('active')
  tab.parentNode.classList.add(lang)
}

function activateTabs () {
  const tabs = Array.from(document.querySelectorAll('.koda-tabs'))
  return Promise.all(tabs.map((tab) => {
    toggleTab(tab.querySelector(tab.parentNode.dataset.selected ? '.koda-tab-' + tab.parentNode.dataset.selected : '.koda-tab-result'))
    const targets = Array.from(tab.querySelectorAll('[data-toggle]'))
    return Promise.all(targets.map((target) => {
      target.addEventListener('click', (e) => { toggleTab(e.target.parentNode) })
    }))
  }))
}

var _self = (typeof window !== 'undefined') ? window : {}

var _ = _self.Koda = {
  init: function () {
    const roots = Array.from(document.querySelectorAll('.koda'))
    Promise.all(roots.map((root) => {
      root.style.setProperty('--koda-height', root.dataset.height ? root.dataset.height : '235px')
      const tabs = createElement('ul', 'koda-tabs', 0, root)
      const boxes = createElement('div', 'koda-boxes', 0, root)
      return Promise.all(['html', 'css', 'js'].map((lang) => {
        const el = root.querySelector('.language-' + lang)
        if (el && 'code' in el.dataset) {
          return fetch(el.dataset.code).then(response => response.text())
        }
      })).then((data) => {
        const o = {'html': data[0], 'css': data[1], 'js': data[2]}
        addCode('html', o, tabs, boxes)
        addCode('css', o, tabs, boxes)
        addCode('js', o, tabs, boxes)
        addResult(o, tabs, boxes)
        prism.highlightAllUnder(boxes)
      })
    })).then(() => { return activateTabs() })
  }
}

if (_self.document) {
  document.addEventListener('DOMContentLoaded', _.init)
}

module.exports = _self.Koda
