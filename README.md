# anybar-webpack-plugin

See the status of webpack builds in macOS menubar via
[Anybar](https://github.com/tonsky/AnyBar).

- Supports multiple webpack builds.
- Indicates whether watch is running or not.
- Compatible with webpack 5.

## Install

1. Install [Anybar](https://github.com/tonsky/AnyBar).
1. Install anybar-webpack-plugin.

``` shell
$ yarn add -D anybar-webpack-plugin
```

## Configure

``` javascript
const AnybarWebpackPlugin = require('anybar-webpack-plugin');

module.exports = {
  // Your webpack configuration ...
  plugins: [
    new AnybarWebpackPlugin({
      port: 1738 // default
    }),
    // etc.
  ],
};
```

## Use

1. Start anybar, for example, `open -na AnyBar`, which binds to UDP port 1738
   by default.
1. Run your webpack build.
1. See anybar indicator update to reflect the status of the build.

For multiple webpack builds, bind AnyBar to different ports:

``` shellsession
$ ANYBAR_TITLE=main ANYBAR_PORT=1738 open -na AnyBar
$ ANYBAR_TITLE=other ANYBAR_PORT=1739 open -na AnyBar
```

And specify `port` in each webpack build config.
