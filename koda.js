function endWith (a, b) {
  return a.substr(-b.length) === b
}

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
      return data['css'] ? (endWith(data.css, '.css') ? '<link rel="stylesheet" href="' + data.css + '">' : '<style>' + data.css + '</style>') : ''
    case 'js':
      return data['js'] ? (endWith(data.js, '.js') ? '<script src="' + data.js + '"></script>' : '<script>' + data.js + '</script>') : ''
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
  iframe.height = '200px'
  iframe.src = 'about:blank'
  iframe.style.overflow = 'hidden'
  iframe.setAttribute('frameborder', 0)
  iframe.contentWindow.document.open('text/html', 'replace')
  iframe.contentWindow.document.write('<!DOCTYPE html><html><head>' + css + '</head><body>' + html + js + '</body></html>')
  iframe.contentWindow.document.close()
  return iframe
}

function addResult (data, tabs, boxes) {
  createIframe('koda-result', createElement('div', 'box', 'result', boxes), data)
  const tab = createElement('a', 'tab', 'result', tabs)
  tab.setAttribute('href', '#result')
  tabs.appendChild(tab)
}

function addCode (lang, data, tabs, boxes) {
  if (typeof data[lang] !== 'undefined') {
    const box = createElement('div', 'box', lang, boxes)
    const pre = createElement('pre', 'highlight', 0, box)
    const code = createElement('code', 'language-' + lang, 0, pre)
    code.appendChild(document.createTextNode(data[lang]))
    const tab = createElement('a', 'tab', lang, tabs)
    tab.setAttribute('href', '#' + lang)
    tabs.appendChild(tab)
  }
}

var _self = (typeof window !== 'undefined') ? window : {}

var _ = _self.Koda = {
  init: function () {
    const elements = Array.from(document.querySelectorAll('.koda'))
    Promise.all(elements.map((root) => {
      const embed = createIframe('koda-embed', root)
      const embedBody = embed.contentWindow.document.body
      const tabs = createElement('div', 'tabs', 'tabs', embedBody)
      const boxes = createElement('div', 'boxes', 'boxes', embedBody)
      return Promise.all(['html', 'css', 'js'].map((lang) => {
        const el = root.querySelector('.language-' + lang)
        if (el && 'code' in el.dataset) {
          return fetch(el.dataset.code).then(response => response.text())
        }
      })).then((data) => {
        const o = {'html': data[0], 'css': data[1], 'js': data[2]}
        addResult(o, tabs, boxes)
        addCode('html', o, tabs, boxes)
        addCode('css', o, tabs, boxes)
        addCode('js', o, tabs, boxes)
      })
    }))
  }
}

if (_self.document) {
  document.addEventListener('DOMContentLoaded', _.init)
}

module.exports = _self.Koda
