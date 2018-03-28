import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';
import { task } from 'ember-concurrency';


export default Component.extend({

  'geoLocation': service(),

  'ajax': service(),

  'fetchWikiResults': task( function * ( poi ) {
    const ajax = get( this, 'ajax' );
    const data = yield ajax.request( `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=coordinates%7Cpageimages%7Cpageterms&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&wbptterms=description&generator=geosearch&ggscoord=${poi.latitude}|${poi.longitude}&ggsradius=10000&ggslimit=50&format=json` );

    return data.query.pages;
  }).restartable(),

  'articles': computed( 'geoLocation.poi', function() {
    const poi   = get( this, 'geoLocation.poi' );
    const fetch = get( this, 'fetchWikiResults' );

    const data = fetch.perform( poi );

    return data
  })


});
