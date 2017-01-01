import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';
import { $hook } from 'ember-hook';

export default Scene.extend({
  name: 'Menu Direction Test',

  start: task(function * (script) {
    let menu = yield script.menu(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']).header('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget porta nisl. Fusce augue lacus, accumsan vel malesuada ut, volutpat ac risus. Curabitur vitae est et mauris dictum ullamcorper in ac erat. Morbi bibendum nisi nec diam condimentum, a fringilla est mollis. Vivamus lobortis metus risus, non facilisis arcu convallis dictum. Nullam fermentum purus sed justo eleifend ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non eros ipsum. In porta metus ligula, at faucibus sem blandit ac. Mauris fermentum non quam sit amet congue. Aenean congue mi in finibus dapibus. Sed at metus lacus. Sed varius euismod lectus scelerisque volutpat. Maecenas maximus justo nunc, vel euismod nibh ullamcorper vel. In nisl nibh, eleifend sed felis eu, sollicitudin consectetur tortor. Ut fringilla nibh at volutpat tempor. Etiam auctor, libero a semper venenatis, sapien urna ultrices nisi, quis molestie ex lacus et lorem. Donec faucibus nibh a suscipit malesuada. Proin accumsan massa ac purus faucibus rhoncus. Donec ut metus sit amet augue fermentum tempus porta et arcu. Proin pretium tellus orci, in tempor ante iaculis eu. Donec congue eros sit amet metus gravida, id suscipit nunc cursus. Donec ac ante magna. Nunc quis purus ornare, euismod ante in, facilisis orci. Proin a magna quis sapien gravida iaculis. Sed placerat finibus molestie. Proin quis mollis neque. Sed volutpat aliquet malesuada. Donec sollicitudin, odio nec accumsan lacinia, ligula lorem maximus ex, at venenatis urna mauris sit amet odio. Nulla at magna et lorem porttitor gravida non sit amet lacus. Phasellus orci metus, tincidunt sed quam at, euismod rutrum dolor. Donec vestibulum urna in felis auctor consequat. Pellentesque faucibus sem id ultricies scelerisque. Vestibulum pellentesque varius risus, vel lobortis nisi aliquet sed. Nunc sit amet imperdiet risus. In ac tincidunt metus. Nullam pulvinar leo nec nibh dignissim, id volutpat ligula elementum. Donec maximus luctus tortor, in luctus enim eleifend sed. Nunc id lorem mollis, aliquet enim ac, feugiat odio. Sed eget elit mi. Suspendisse urna libero, sodales a nunc eu, scelerisque malesuada ex. Maecenas a augue nulla. Praesent tempor, nisi et semper venenatis, nunc nisi venenatis metus, sed condimentum velit erat eu ligula. Maecenas a enim quam. Duis vestibulum imperdiet risus sed commodo.');

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
