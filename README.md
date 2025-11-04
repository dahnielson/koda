# Koda

[![Greenkeeper badge][greenkeeper badge]][greenkeeper]
[![Standard JS CI badge][standardjs badge]][standardjs]

A web component to embed front-end demos.

## Install

You can either install Koda by running yarn (recommended)

```bash
yarn add @kodapan/koda prismjs
```

or use npm

```bash
npm install @kodapan/koda prismjs --save
```

## Usage

You will need to include the `koda-embed.js` file as a module.

```html
<script src="koda-embed.js" type="module"></script>
```

Next you need to set up the code in HTML.

```html
<koda-embed selected="html" height="250px" theme="light">
  <code class="language-html" data-code="demo.html"></code>
  <code class="language-css" data-code="demo.css"></code>
  <code class="language-js" data-code="demo.js"></code>
</koda-embed>
```

While Koda internarly is using Prism to highlight the code, it is using it own
scoped styles to theme the code. Currently available themes are "light" and
"dark".

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/dahnielson/koda/tags).

## Authors

* **Anders Dahnielson** - *Initial work* - [dahnielson](https://github.com/dahnielson)

## License

MIT License, see [LICENSE.md](LICENSE.md) for details.

## Acknowledgments

* [CodePen](https://codepen.io) for the original concept
* [Cody](https://github.com/lmgonzalves/cody) for the idea to roll my own

[travis badge]: https://travis-ci.com/dahnielson/koda.svg?branch=master
[travis]: https://travis-ci.com/dahnielson/koda
[greenkeeper badge]: https://badges.greenkeeper.io/dahnielson/koda.svg
[greenkeeper]: https://greenkeeper.io
[standardjs badge]: https://img.shields.io/badge/code%20syle-standard-brightgreen.svg
[standardjs]: https://github.com/standard/standard
