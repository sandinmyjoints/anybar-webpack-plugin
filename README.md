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

<img width="74" alt="Screen Shot 2021-06-25 at 19 08 14" src="https://user-images.githubusercontent.com/606772/123645934-c27e9600-d7f4-11eb-868c-02b71e8136ec.png">
- Hollow = build/watch is not running
- Yellow = build/watch is compiling
- Green = last watch compilation succeeded; watching for changes
- Red exclamation (not picture) = last compilation errored
