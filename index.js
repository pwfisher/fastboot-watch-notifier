'use strict';

const debounce = require('debounce');
const Sane = require('sane');

const DEFAULT_DEBOUNCE_DELAY = 1007;

class WatchNotifier {
  constructor(options) {
    this.distPath = options.distPath;
    this.debounceDelay = options.debounceDelay || DEFAULT_DEBOUNCE_DELAY;
    this.saneOptions = options.saneOptions || {};
  }

  subscribe(notify) {
    const watcher = new Sane(this.distPath, this.saneOptions);
    const listener = debounce(notify, this.debounceDelay);
    watcher.on('all', listener);
    return Promise.resolve();
  }
}

module.exports = WatchNotifier;
