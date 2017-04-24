# Imgur Scraper

## Info
Varation of [s992's imgur scraper](https://github.com/s992/imgur-scraper). Imgur seemed to be throttling scrapes to 10 images so I'm using the imgur API with this.

## Usage
`node index.js -g [gallery id] -d [download directory]`

* Gallery ID is required and must be the full path to an Imgur gallery.
* Absolute path to a download directory is required or an error will be thrown. The download directory will be created relative to `index.js`.

## Installation
1. Clone this repo.
2. Run `npm install`.
3. Download images!

## Thanks!
Wouldn't have been possible without these modules:

* https://github.com/mikeal/request
* https://github.com/substack/node-mkdirp
* https://github.com/substack/minimist
