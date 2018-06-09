# Koda

[![Travis CI badge][travis badge]][travis]
[![Greenkeeper badge][greenkeeper badge]][greenkeeper]
[![Standard JS CI badge][standardjs badge]][standardjs]

A library to embed front-end demos.

## Install

You can either install Koda by running yarn (recommended)

```bash
yarn add @kodapan/koda
```

or use npm

```bash
npm install @kodapan/koda
```

## Usage

You will need to include the `koda.css` and `koda.js` files.

```html
<link rel="stylesheet" href="koda.css">
<script src="koda.js"></script>
```

Koda is using Prism to style and highlight the code, why you will need to include the Prism theme of your choice that should be used to highlight the code.

```html
<link href="themes/prism.css" rel="stylesheet">
```

Next you need to set up the code in HTML.

```html
<div class="koda" data-selected="js" data-height="250px">
  <code class="language-html" data-code="demo.html"></code>
  <code class="language-css" data-code="demo.css"></code>
  <code class="language-js" data-code="demo.js"></code>
</div>
```

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
