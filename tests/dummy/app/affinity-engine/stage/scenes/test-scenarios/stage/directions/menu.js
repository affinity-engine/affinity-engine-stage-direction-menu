import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';
import { $hook } from 'ember-hook';

export default Scene.extend({
  name: 'Menu Direction Test',

  start: task(function * (script) {
    let menu = yield script.menu(['A', 'B', 'C']);

    $hook('data').text(`key: ${menu.result.key}, text: ${menu.result.text}`);

    menu = yield script.menu([
      { key: 'keyA', text: 'textA' },
      { key: 'keyB', text: 'textB' },
      { key: 'keyC', text: 'textC' }
    ]);

    $hook('data').text(`key: ${menu.result.key}, text: ${menu.result.text}`);

    menu = yield script.menu([
      { key: 'keyA', text: 'textA', inputable: true },
      { key: 'keyB', text: 'textB' },
      { key: 'keyC', text: 'textC' }
    ]);

    $hook('data').text(`key: ${menu.result.key}, text: ${menu.result.text}, input: ${menu.result.value}`);

    menu = yield script.menu(['A', 'B', 'C']).header('foo').classNames(['bar', 'baz']);
  })
});
