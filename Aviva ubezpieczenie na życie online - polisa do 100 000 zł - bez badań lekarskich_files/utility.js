define( [ 'jquery' ], function( $ ) {
	'use strict';

	$.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) {
			return c/2*t*t*t + b;
		}
		t-=2;
		return c/2*(t*t*t + 2) + b;
	};

	return {
		smallTag : 'small',
		mediumTag : 'medium',
		largeTag : 'large',

		urlRegExp : new RegExp('\#[a-zA-Z0-9\/\?\%\-]+'),

		getBreakpoint : function() {
			var tag;

			if ( window.getComputedStyle ) {
				tag = window.getComputedStyle( document.body, ':after' ).getPropertyValue( 'content' );
			} else if ( document.documentElement.currentStyle ) {
				tag = document.documentElement.currentStyle.fontFamily;
			} else {
				tag = this.largeTag;
			}

			tag = tag.replace( /"/g,'').replace(/['",]/g, '');   // Firefox and Android bugfixs

			return tag;
		},

		// Utility function to create a random ID
		makeId : function( prefix ) {
			var newID = '',
				poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
				possLength = poss.length;

			for( var i = 0; i < 5; i++ ) {
				newID += poss.charAt( Math.floor( Math.random() * possLength ) );
			}

			return ( prefix ? prefix : '' ) + newID;
		},

		processInPageLinks : function( selector, linkFunction ) {
			$( 'a[href*="#"]' + selector ).each( function () {
				// The below string fixes are in here because IE6 returns this.pathname and this.host differently
				var pathname = this.pathname;

				if ( pathname.indexOf( '/' ) ){
					pathname = '/' + pathname;
				}

				var host = this.host.replace( ':8080', '' ).replace( ':80', '' ).replace( ':443', '' ),
					locationHost = location.host.replace( ':8080', '' ).replace( ':80', '' ).replace( ':443', '' );

				if ( location.pathname === pathname && locationHost === host ) {
					linkFunction( this );
				}
			});
		},

		debounce : function( func, wait, immediate ) {
			var timeout;
			return function() {
				var context = this,
					args = arguments;
				var later = function() {
					timeout = null;
					if ( !immediate ) {
						func.apply( context, args );
					}
				};
				var callNow = immediate && !timeout;
				clearTimeout( timeout );
				timeout = setTimeout( later, wait );
				if ( callNow ) {
					func.apply( context, args );
				}
			};
		}
	};
});
