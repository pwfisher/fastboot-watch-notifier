# fastboot-watch-notifier
__fastboot-watch-notifier__ is an Ember [fastboot-app-server](https://github.com/ember-fastboot/fastboot-app-server) notifier which restarts the server on watched file changes. It supports polling.

This package uses [sane](https://github.com/amasad/sane) and exposes its options in order to support polling. Why? Because [1](https://stefanwrobel.com/how-to-make-vagrant-performance-not-suck)) Vagrant volumes need to use NFS for performance and [2](http://stackoverflow.com/questions/4231243/inotify-with-nfs)) NFS does not support change events.

# Usage
```javascript
const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const distPath = '/app/dist';
const debounceDelay = 250;

const notifier = new FastBootWatchNotifier({
  debounceDelay,
  distPath,
  saneOptions: {
    poll: true,
  },
});

const server = new FastBootAppServer({
  distPath,
  notifier,
});

server.start();
```

See [sane](https://github.com/amasad/sane) for available `saneOptions`.
Inspired by [fastboot-fs-notifier](https://github.com/iheanyi/fastboot-fs-notifier).

Don't feel like adding this dependency? Do it yourself like [this gist](https://gist.github.com/pwfisher/6a6a0e0de62649e06141e37749f23fcf).
