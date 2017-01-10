var fs = require("fs"),
	path = require("path"),
	argv = require("minimist")( process.argv.slice( 2 ) ),
	request = require("request"),
	mkdirp = require("mkdirp"),
	ineed = require("ineed");

var gallery = argv.g,
	dir = path.resolve( argv.d || "downloads" );


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



if( gallery && dir ) {

	ineed.collect.hyperlinks.from( gallery, function( err, response, result ) {
		var hrefs = [];
		result.hyperlinks.forEach( function( link ) {
	 		// there must be a better way to find the correct links..
	 		// only name and href are returned in the hyperlink collect, very hard to find another way
			var imagePath = link.href;
			if (imagePath.search('/i.imgur') != -1) {
				hrefs.push(imagePath);
			}
					
			
		});

		grabImages( hrefs );

	});

} 
else {

	console.log( "Usage: node index.js -g [gallery url] -d [download directory]" );
	console.log( "\t-g The full URL to an Imgur gallery" );
	console.log( "\t-d The path to the download directory. Default is \"download\".");
	
}


