// Configure requireJS
var require = {
	baseUrl: '/js',
	baseBlocksUrl: 'blocks',
	paths: {
		jquery: 'vendor/jquery/jquery-2.2.2',
		'b': 'block'
	},
	packages: [{
		name: 'moment',
		location: 'vendor',
		main: 'moment'
	}],
	'shim': {
		'vendor/jquery/mCustomScrollbar' : [ 'jquery' ],
		'vendor/prettify/prettify' : [ 'jquery' ],
		'vendor/pikaday' : [ 'moment' ]
	}
};

var requireCss = {
	baseUrl: '/css',
	loadCss: function ( url ) {
		var link = document.createElement( 'link' );
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = requireCss.baseUrl + '/vendor' +  url;
		document.getElementsByTagName( 'head' )[0].appendChild( link );
	}
};

(function() {
	'use strict';

	// Check browser has minium level of  feature support
	if( 'querySelector' in document && 'sessionStorage' in window && 'addEventListener' in window ) {
		if ( sessionStorage.getItem( 'fonts-loaded' ) === 'success' ) {
			window.document.documentElement.className += ' fonts-loaded';
		}


		// Set base URL based on where init.js is being loaded from
		var initScript = document.getElementById( 'js-init' );
		if ( initScript !== null ) {
			var currentUrl = initScript.src;
			require.baseUrl = currentUrl.replace( '/init.js', '' );
			requireCss.baseUrl = currentUrl.replace( '/js/init.js', '/css' );

			var appUrl = initScript.getAttribute( 'data-app' );
			if ( appUrl !== null ) {
				require.paths.app = appUrl;
			}
		}

		// Insert requireJS in page
		var head = document.getElementsByTagName( 'head' )[0],
			script = document.createElement( 'script' );
		script.src = require.baseUrl + '/vendor/core/require.js';
		script.setAttribute( 'data-main', 'main' );
		head.appendChild( script );
	}
})();
