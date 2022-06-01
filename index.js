/*
 * Start anybar with:
 * ANYBAR_TITLE=main ANYBAR_PORT=1738 open -na AnyBar
 */

const { validate } = require('schema-utils');
const dgram = require('dgram');
const anybarSocket = dgram.createSocket('udp4').unref();
let isEnabled = true;

anybarSocket.on('error', () => {
  isEnabled = false;
});

const schema = {
  type: 'object',
  properties: {
    port: {
      type: 'number',
    },
  },
};

class AnybarWebpackPlugin {
  constructor(options = {}) {
    // TODO: make static.
    const defaultOptions = {
      port: 1738,
    };

    validate(schema, options, {
      name: 'AnybarWebpackPlugin',
      baseDataPath: 'options',
    });
    this.options = { ...defaultOptions, ...options };

    this.send = ['hollow', 'green', 'yellow', 'exclamation'].reduce(
      (map, color) => {
        map[color] = this._send.bind(this, color);
        return map;
      },
      {}
    );

    this.eventMapAsync = {
      beforeRun: this.send['yellow'],
      watchRun: this.send['yellow'],
      beforeCompile: this.send['yellow'],
    };

    this.eventMapSync = {
      failed: this.send['exclamation'],
      watchClose: this.send['hollow'],
    };

    ['SIGINT', 'SIGTERM'].forEach(ev => {
      process.on(ev, () => {
        this.stop(() => {
          process.exit(0);
        });
      });
    });

    process.once('beforeExit', () => {
      anybarSocket.ref();
      this.stop(() => {
        anybarSocket.unref();
      });
    });
  }

  _send(message, cb = () => {}) {
    if (isEnabled)
      anybarSocket.send(
        message,
        0,
        message.length,
        this.options.port,
        null,
        cb
      );
    else cb();
  }

  stop(cb = () => {}) {
    this._send('hollow', cb);
  }

  apply(compiler) {
    const pluginName = 'AnybarWebpackPlugin';

    Object.keys(this.eventMapAsync).forEach(event => {
      compiler.hooks[event].tapAsync(pluginName, (_, cb) => {
        this.eventMapAsync[event](cb);
      });
    });

    Object.keys(this.eventMapSync).forEach(event => {
      compiler.hooks[event].tap(pluginName, () => {
        this.eventMapSync[event]();
      });
    });

    compiler.hooks.done.tapAsync(pluginName, (stats, cb) => {
      if (stats.hasErrors()) {
        this._send('exclamation', cb);
      } else {
        this._send('green', cb);
      }
    });
  }
}

module.exports = AnybarWebpackPlugin;
