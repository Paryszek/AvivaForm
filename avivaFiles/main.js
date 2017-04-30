// Setup global namespace
var FRAMEWORK = window.FRAMEWORK || {};

// Set localisation setting

FRAMEWORK.locale = {
	default: {
		datepicker : {
			locale : 'en-gb',
			previousMonth : 'Previous month',
			nextMonth : 'Next month',
			weekdaysShort	: ['S','M','T','W','T','F','S']
		},
		faqList : {
			backLinkText : 'Back to FAQ list'
		},
		fileUpload : {
			multipleCaption : '{count} files selected'
		},
		formHelp : {
			text : 'Help'
		},
		media : {
			progress : 'played',
			progressTime : 'time',
			restart	: 'Restart',
			rewind	: 'Rewind',
			play : 'Play',
			playVideo : 'Play video',
			playAudio : 'Play audio',
			pause : 'Pause',
			forward : 'Forward',
			mute : 'Mute',
			volume : 'Volume',
			captions : 'Captions',
			fullscreen : 'Fullscreen',
			seconds : 'seconds'
		},
		modalWindow : {
			closeText : 'Close',
			loadingText : 'Please wait'
		},
		printButton : {
			text : 'Print'
		},
		agentCallback : {
			closeText : 'Close'
		},
		masthead : {
			closeText : 'Close',
			loadingText : 'Please wait'
		},
		tabs : {
			moreText : 'More',
			closeText : 'Close'
		}
	}
};


require( [ 'jquery' ], function () {
	// Function to scan all modules for a data attribute to link to required JS and run
	function setLocalisation () {
		var lang = document.documentElement.lang;

		if ( typeof locale !== 'undefined' && locale[ lang ] ) {
			FRAMEWORK.locale.settings = $.extend( true, {}, FRAMEWORK.locale.default, locale[ lang ] );
		} else {
			FRAMEWORK.locale.settings = $.extend( true, {}, FRAMEWORK.locale.default, null );
		}
	}

	setLocalisation();
});



// Load any block modules that are on the page, and run their
// initInstances function if one exists. We also pass in the
// element that the module was referenced on as their may be
// more than one copy of the block on the page.

require( [ 'jquery' ], function () {
	// Function to scan all modules for a data attribute to link to required JS and run
	function moduleScan () {
		var elements = document.querySelectorAll( '[data-module]' );
		Array.prototype.forEach.call( elements, function ( e ){
			require( [ 'b!' + e.getAttribute( 'data-module' ) ], function( mod ) {
				if ( mod && mod.hasOwnProperty( 'initInstance' ) ) {
					mod.initInstance( e );
				}
			});
		});
	}

	moduleScan();
	$( 'body' ).on( 'moduleScan' , moduleScan );
});

// if the class is already set, we're good.
if ( window.document.documentElement.className.indexOf( 'fonts-loaded' ) === -1 ) {
	// Checks for fonts loaded
	require( [ 'vendor/core/fontfaceobserver' ] , function() {
		'use strict';

		var fonts = [
			new window.FontFaceObserver( 'source_sans_probold' ),
			new window.FontFaceObserver( 'source_sans_prosemibold' ),
			new window.FontFaceObserver( 'source_sans_proregular' ),
			new window.FontFaceObserver( 'source_sans_prolight' )
		].map(function (font) {
			return font.load();
		});

		window.Promise
			.all( fonts )
			.then( function() {
				window.document.documentElement.className += ' fonts-loaded';
				sessionStorage.setItem( 'fonts-loaded', 'success' );
			});
	});
}
