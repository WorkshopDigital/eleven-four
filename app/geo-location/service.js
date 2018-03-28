import Service from '@ember/service';
import { computed, set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { Promise } from 'rsvp';


export default Service.extend({


  'paperToaster': service(),


  '_currentPosition': null,


  'poi': null,


  'currentPosition': computed.alias( '_currentPosition' ),


  'getCurrentLocation': task( function * () {
    const toast = get( this, 'paperToaster' );
    toast.show( 'Searching for your location.' );

    try{
      const location =  yield new Promise( ( resolve, reject ) => {
        return window.navigator.geolocation.getCurrentPosition( resolve, reject );
      })
      .catch( e => {
        console.log( e );
      });

      toast.show( 'Location Found' );
      set( this, '_currentPosition', {
        'latitude':  location.coords.latitude,
        'longitude': location.coords.longitude,
      });
    }
    catch( e ) {

      toast.show( e.mesage );

      console.error( e );
    }
  }).restartable(),


  init() {
    this._super( ...arguments );
    const defaultCoords = {
      'latitude': 37.5322176,
      'longitude': -77.4300245
    };
    set( this, '_currentPosition', defaultCoords );
    set( this, 'poi', defaultCoords );

  }

});
