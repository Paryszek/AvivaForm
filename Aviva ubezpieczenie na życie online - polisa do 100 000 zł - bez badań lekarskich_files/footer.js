define( [ 'jquery' ], function( $ ) {
	'use strict';

	var footer = {
		init : function ( el ) {
			this.create( $( el ) );
		},

		create : function( element ) {
			if ( !element.hasClass( 'js-footer' ) ) {

				element.addClass( 'js-footer' );

				var self = this,
					$window = $( window ),
					$body = $( 'body' ),
					$main = $( '#main' );

				if ( $main.length > 0 ) {
					self.setHeight( $window, $body, $main );

					$window.on( 'resize', function () {
						self.setHeight( $window, $body, $main );
					});
				}
			}
		},

		setHeight : function ( $window, $body, $main ) {
			var currentMainHeight = $main.css( 'min-height', 0 ).height();
			var windowHeight = $window.height();
			var bodyHeight = $body.height();

			if ( bodyHeight < windowHeight ) {
				$main.css( 'min-height', currentMainHeight + ( windowHeight - bodyHeight ) + 'px' );
			}
		}

	};

	return {
		initInstance: function ( el ) {
			footer.init( el );
		}
	};
});
