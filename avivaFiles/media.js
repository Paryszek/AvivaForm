define( [ 'jquery', 'utility', 'vendor/media' ], function( $, util ) {
	'use strict';

	// Showhide
	var media = {
		init : function ( el ) {
			this.create( $( el ) );
		},

		create : function ( element ) {
			if ( !element.hasClass( 'js-media' ) ) {

				var mediaTitle = element.siblings( '[itemprop="name"]' ).text(),
					mediaId = element.attr( 'id' ),
					mediaType = element.prop( 'tagName' ).toLowerCase();


				if ( !mediaId ) {
					mediaId = util.makeId( mediaType + '__' );
				} else {
					mediaId = mediaType + '__' + mediaId;
				}

				element.addClass( 'js-media' )
					.addClass( 'media' )
					.wrap( '<div class="media__container media__container--' + mediaType + '" id="' + mediaId + '"><div class="media__captions-container"><div class="media__wrapper"></div></div><div class="media__controls"></div></div>' )
					.parent()
					.before( '<div class="media__captions hide"></div>' );

				element.video = new InitVideo({
					'videoId': mediaId,
					'captionsOnDefault': false,
					'seekInterval': 10,
					'videoTitle': mediaTitle,
					'debug': true
				});

				this.started = false;
				this.track(element[0]);
			}
		},

		getMediaName : function (media) {
			return $(media).parents('.media__container').siblings('[itemprop="name"]').text();
		},

		// Bind Adobe Analytics Tracking to video Events
		track : function ( v ) {
			var mediaName = this.getMediaName(v);

			v.addEventListener('playing', function() {
				if (typeof s !== 'undefined') {
					if (this.started === true) {
						s.Media.play(mediaName, v.currentTime);
					} else {
						this.started = true;
						s.Media.open(mediaName, v.duration, 'AvivaPlayer');
						s.Media.play(mediaName, 0);
					}
				}
			}, true);

			v.addEventListener('seeked', function() {
				if (typeof s !== 'undefined') {
					if (this.started === true) {
						s.Media.stop(mediaName, v.currentTime);
						if (!v.paused) {
							s.Media.play(mediaName, v.currentTime);
						}
					} else {
						this.started = true;
						if (!v.paused) {
							s.Media.open(mediaName, v.duration, 'AvivaPlayer');
							s.Media.play(mediaName, v.currentTime);
						}
					}
				}
			}, true);

			v.addEventListener('pause', function() {
				if (typeof s !== 'undefined') {
					s.Media.stop(mediaName, v.currentTime);
				}
			}, true);

			v.addEventListener('ended', function() {
				this.started = false;
				if (typeof s !== 'undefined') {
					s.Media.stop(mediaName, v.currentTime);
					s.Media.close(mediaName);
				}
			}, true);
		}
	};

	return {
		initInstance: function ( el ) {
			media.init( el );
		}
	};
});
