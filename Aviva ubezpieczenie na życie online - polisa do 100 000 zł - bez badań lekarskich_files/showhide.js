define( [ 'jquery', 'utility' ], function( $, util ) {
	'use strict';

	// Showhide
	var showhide = {
		init : function ( el ) {
			this.create( $( el ) );
		},

		create : function ( wrapper ) {

			if ( !wrapper.hasClass( 'js-showhide' ) ) {

				wrapper.addClass( 'js-showhide' );

				// Get config data
				var config = wrapper.data();

				// Get control elements
				var controls = wrapper.find( '.showhide__heading' ).not( wrapper.find( '.showhide .showhide__heading' ));

				// Hide content elements
				controls.next().hide();

				// Add a link to each control pointing to an id set on the following element
				controls.each(function() {

					var $this = $( this ),
						elementID = $this.attr( 'id' ),
						autoID = 'term' + $this.index( '.showhide__heading' );

					$this.wrapInner( '<a class="showhide__control"></a>' );

					if ( elementID !== undefined ) {
						autoID = elementID + '-term';
					}

					var hrefID = '#' + autoID;

					$this.children( 'a' ).attr({
						'href' : hrefID,
						'aria-controls' : hrefID,
						'aria-expanded' : 'false'
					});

					$this.next().attr({
						'id' : autoID,
						'aria-hidden' : 'true'
					});

				});

				// Add a click event to the control to open the associated element
				controls.on( 'click', 'a.showhide__control', function( e ) {

					e.preventDefault();

					var $this = $( this ),
					$thisparent = $this.parent();

					var parentId = $thisparent.attr( 'id' );
					if (parentId) {
						history.replaceState( null, null, '#' + parentId );
					}

					$this.attr( 'aria-expanded', function( index, attr ) { return attr === 'true' ? 'false' : 'true'; } );

					$thisparent.toggleClass( 'is-visible' );
					$thisparent.next().slideToggle( 600, 'easeInOutCubic' ).attr( 'aria-hidden', function( index, attr ){ return attr === 'true' ? 'false' : 'true'; } );

					if ( (config.accordion !== undefined  && config.accordion === true) || ( util.getBreakpoint() === util.smallTag ) ) {
						var otherControls = controls.not( $thisparent ).filter( '.is-visible' ).removeClass( 'is-visible' );

						if ( otherControls.length > 0 ) {
							otherControls.children( '.showhide__control' ).attr( 'aria-expanded', 'false' );
							var windowOffset = $( window ).scrollTop() - wrapper.offset().top;

							otherControls.next().slideUp( 300, function () {

								var moveTo = wrapper.offset().top + windowOffset,
									thisOffset = $thisparent.offset().top;

								if ( thisOffset < moveTo ) {
									moveTo = thisOffset;
								}

								$( 'html, body' ).animate({
									scrollTop: moveTo
								}, 300);

							}).attr( 'aria-hidden', 'true' );
						}
					}

				});

				util.processInPageLinks( '', function( element ) {

					var href = $( element ).attr( 'href' ).match( util.urlRegExp ),
						control = $( '.showhide__heading' + href );

					if ( ( href !== null ) && ( control.length >= 1 ) ) {
						$( element ).on( 'click', function() {
							control.addClass( 'is-visible' ).children( 'a' ).attr( 'aria-expanded', 'true' );
							control.next().show().attr( 'aria-hidden', 'false' );
						});
					}

				});

				// Open the associated element when the incoming link points to an id on a control
				var pageUrl = window.location.href,
					href = pageUrl.match( util.urlRegExp ),
					$control = null;

				// if a valid href is found check to see if it matches any of the showhide headings
				if ( href !== null ) {
					$control = controls.filter( href );
				}

				// No controls have been identified to open on load then check if there is one set to automatically open on load
				if ( !$control || $control.length <= 0 ) {
					$control = controls.filter( '.js-showhide-open' );
				}

				// Open any controls identified by the above
				if ( $control && $control.length > 0 ) {
					$control.addClass( 'is-visible' ).children( 'a' ).attr( 'aria-expanded','true' );
					$control.next().show().attr( 'aria-hidden', 'false' );
				}
			}
		}
	};

	return {
		initInstance: function ( el ) {
			showhide.init( el );
		}
	};
});
