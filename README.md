# Koda

[![Travis CI badge][travis badge]][travis]
A library to embed front-end demos.

## Installing

You can either install Koda by running yarn (recommended)

```bash
yarn add @kodapan/koda
```

or use npm

```bash
npm install @kodapan/koda
```

## Basic usage

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [CodePen](https://codepen.io) for the original concept
* [Cody](https://github.com/lmgonzalves/cody) for the idea to roll our own
[travis badge]: https://travis-ci.com/dahnielson/koda.svg?branch=master
[travis]: https://travis-ci.com/dahnielson/koda
