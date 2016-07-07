import { Scene } from 'affinity-engine-stage';
import { $hook } from 'ember-hook';

export default Scene.extend({
  name: 'Menu Direction Test',

  start: async function(script) {
    const data = $hook('data');

    let menu = await script.menu(['A', 'B', 'C']);

    data.text(`key: ${menu.result.key}, text: ${menu.result.text}`);

    menu = await script.menu([
      { key: 'keyA', text: 'textA' },
      { key: 'keyB', text: 'textB' },
      { key: 'keyC', text: 'textC' }
    ]);

    data.text(`key: ${menu.result.key}, text: ${menu.result.text}`);

    menu = await script.menu([
      { key: 'keyA', text: 'textA', inputable: true },
      { key: 'keyB', text: 'textB' },
      { key: 'keyC', text: 'textC' }
    ]);

    data.text(`key: ${menu.result.key}, text: ${menu.result.text}, input: ${menu.result.value}`);

    menu = await script.menu(['A', 'B', 'C']).header('foo').classNames(['bar', 'baz']);
  }
});
