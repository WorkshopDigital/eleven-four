import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | geo-location', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:geo-location');
    assert.ok(service);
  });
});

