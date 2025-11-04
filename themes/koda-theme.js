import { css } from 'lit'

export const kodaTheme = css`
:host {
  --koda-height: 224px;
  --koda-height-tabs: 24px;
  --koda-border-size-tabs: 4px;
  --koda-border-size-boxes: 1px;
  --koda-color: #ccc;
  --koda-font-size-tab: 12px;
  --koda-color-html: #fff;
  --koda-color-css: #fff;
  --koda-color-js: #000;
  --koda-color-result: #000;
  --koda-background-color: #3d3d3d;
  --koda-background-color-html: #f4511e;
  --koda-background-color-css: #3f51b5;
  --koda-background-color-js: #ffeb3b;
  --koda-background-color-result: #bdbdbd;
  --koda-background-color-loading-from: #ddd;
  --koda-background-color-loading-to: #fff;
  height: var(--koda-height);
  overflow: hidden;
  position: relative;
}

:host > code {
  display: none;
}

:host > ul.koda-tabs {
  background-color: var(--koda-background-color);
  height: var(--koda-height-tabs);
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
  font-size: var(--koda-font-size-tab);
}

:host > ul.koda-tabs.html {
  border-bottom: var(--koda-border-size-tabs) solid var(--koda-background-color-html);
}

:host > ul.koda-tabs.css {
  border-bottom: var(--koda-border-size-tabs) solid var(--koda-background-color-css);
}

:host > ul.koda-tabs.js {
  border-bottom: var(--koda-border-size-tabs) solid var(--koda-background-color-js);
}

:host > ul.koda-tabs.result {
  border-bottom: var(--koda-border-size-tabs) solid var(--koda-background-color-result);
}

:host .koda-tab {
  cursor: pointer;
  display: block;
  padding: 0;
  margin: 0;
}

:host .koda-tab-html.active {
  background-color: var(--koda-background-color-html);
}

:host .koda-tab-css.active {
  background-color: var(--koda-background-color-css);
}

:host .koda-tab-js.active {
  background-color: var(--koda-background-color-js);
}

:host .koda-tab-result.active {
  background-color: var(--koda-background-color-result);
}

:host .koda-tab > a {
  display: block;
  height: 100%;
  padding: 0 1em;
  line-height: var(--koda-height-tabs);
  color: var(--koda-color);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
}

:host .koda-tab-result > a {
  text-transform: capitalize;
}

:host .koda-tab-html.active > a {
  color: var(--koda-color-html);
}

:host .koda-tab-css.active > a {
  color: var(--koda-color-css);
}

:host .koda-tab-js.active > a {
  color: var(--koda-color-js);
}

:host .koda-tab-result.active > a {
  color: var(--koda-color-result);
}

:host .koda-boxes {
  position: relative;
  height: calc(var(--koda-height) - var(--koda-height-tabs) - var(--koda-border-size-tabs) - var(--koda-border-size-boxes));
  border-left: var(--koda-border-size-boxes) solid var(--koda-background-color);
  border-bottom: var(--koda-border-size-boxes) solid var(--koda-background-color);
  border-right: var(--koda-border-size-boxes) solid var(--koda-background-color);
}

:host .koda-box {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  overflow: auto;
}

:host .koda-box > pre[class*="language-"] {
  margin: 0;
  padding: 1em;
  min-height: 100%;
  overflow: visible;
}

:host .koda-box-result {
  overflow: hidden;
}

:host .koda-box-result > iframe {
  overflow: hidden;
}

:host .koda-boxes > .active {
  display: block;
}

:host .koda-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: var(--koda-background-color-loading-from);
  background: linear-gradient(-45deg, var(--koda-background-color-loading-from) 0%, var(--koda-background-color-loading-to) 50%, var(--koda-background-color-loading-from) 100%);
  background-size: 1000% 100%;
  animation: loading 2s infinite normal none;
}

:host .koda-spinner.koda-finished-loading {
  animation: 0.5s 1 forwards reveal;
}

@keyframes reveal {
  from { opacity: 1; visibility: visible; }
  to { opacity: 0; visibility: hidden; }
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`
