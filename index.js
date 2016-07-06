"use strict";
const debounce = require('debounce');
const Sane = require('sane');

const DEFAULT_DEBOUNCE_DELAY = 250;

class WatchNotifier {
  constructor(options) {
    this.distPath = options.distPath;
    this.saneOptions = options.saneOptions;
    this.debounceDelay = options.debounceDelay || DEFAULT_DEBOUNCE_DELAY;
  }

  subscribe(notify) {
    const watcher = new Sane(this.distPath, this.saneOptions);
    const listener = debounce(notify, this.debounceDelay);
    watcher.on('all', listener);
    return Promise.resolve();
  }
}

module.exports = WatchNotifier;
