import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({

  'geoLocation': service(),

  'actions': {

    getPos() {
      const geo = get( this, 'geoLocation.getCurrentLocation' );

      geo.perform();
    }

  }
});
