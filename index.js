'use strict';

const RSVP = require('rsvp');
const debounce = require('debounce');
const exec = RSVP.denodeify(require('child_process').exec);
const Sane = require('sane');

const DEFAULT_DEBOUNCE_DELAY = 250;

class WatchNotifier {
  constructor(options) {
    this.distPath = options.distPath;
    this.debounceDelay = options.debounceDelay || DEFAULT_DEBOUNCE_DELAY;
    this.saneOptions = options.saneOptions || {};
    this.saneOptions.glob = this.saneOptions.glob || [];
    this.saneOptions.glob.push('index.html');
    this.saneOptions.glob.push('fastboot/**');
  }

  subscribe(notify) {
    this.notify = notify;
    const watcher = new Sane(this.distPath, this.saneOptions);
    const listener = debounce(this.restart.bind(this), this.debounceDelay);
    watcher.on('all', listener);
    return Promise.resolve();
  }

  restart() {
    if (this.restartPromise) {
      this.restartAgain = true;
      return;
    }
    this.restartPromise = exec('npm install', { cwd: this.distPath })
      .then(() => {
        this.restartPromise = null;
        if (this.restartAgain) {
          this.restartAgain = false;
          this.restart();
        } else {
          this.notify();
        }
      });
  }
}

module.exports = WatchNotifier;
