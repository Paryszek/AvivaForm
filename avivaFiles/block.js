define( 'b', {
	load: function ( name, req, onload, config ) {
		if ( config.paths && !config.paths.hasOwnProperty( name ) ) {

			if ( name.indexOf( '/' ) !== -1 ) {
				var splitName = name.split('/');
				if ( config.paths[ splitName[0] ] ) {
					config.paths[ name ] = name.replace( splitName[0], config.paths[ splitName[0] ]);
				} else {
					config.paths[ name ] = config.baseBlocksUrl + '/' + name;
				}
			} else {
				config.paths[ name ] = config.baseBlocksUrl + '/' + name;
			}

		}
		req( [ name ], function ( value ) {
			onload( value );
		});
	}
});
