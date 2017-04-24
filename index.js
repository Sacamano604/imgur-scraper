var fs = require("fs"),
	path = require("path"),
	argv = require("minimist")( process.argv.slice( 2 ) ),
	request = require("request"),
	mkdirp = require("mkdirp");

var hrefs = [];
var galleryId = argv.g,
	dir = path.resolve( argv.d || "downloads" );

var galleryPath = "http://api.imgur.com/3/album/" + galleryId;

var download = function( uri, filename, callback ) {
	request( uri ).pipe( fs.createWriteStream( filename ) ).on( "close", callback );
};

var grabImages = function( hrefs ) {
	mkdirp.sync( dir );
	console.log( "Downloading " + hrefs.length + " images to " + dir + "..." );
	hrefs.forEach( function( href ) {
		var filename = href.split("/").slice(-1)[0];
		download( href, dir + "/" + filename, function() {
			console.log( "Downloaded " + filename );
		});
	});
};

if( galleryPath && dir ) {
	var options = {
		url: galleryPath,
		type: "GET",
		dataType: "json",
		headers: {
       		Authorization: "Client-ID " + "afe6a62d6f36e49",
        	Accept: "application/json"			
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			var imagesObject = info.data.images;
			for (let i = 0; i < imagesObject.length; i++) {
				hrefs.push(imagesObject[i].link);
			}
		}
		grabImages( hrefs );
	}
	request(options, callback);
} 
else {
	console.log( "Usage: node index.js -g [gallery id] -d [download directory]" );
	console.log( "\t-g The full URL to an Imgur gallery" );
	console.log( "\t-d The path to the download directory. Default is \"download\".");

}


