import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';

export default Component.extend({

  'mapLocation': computed.alias( 'geoLocation.currentPosition' ),

  'zoom': 10,

  'geoLocation': service(),

  'selectedMarker': computed.alias( 'geoLocation.poi' ),

  'actions': {

    pointSelection( { latlng } ) {
      const geoLocation = get( this, 'geoLocation' );
      set( geoLocation, 'poi', {
        'latitude': latlng.lat,
        'longitude': latlng.lng
      });
    }
  }
});
