## Info
A webpack plugin that uses [svgstore](https://github.com/svgstore/svgstore) package
to store specified svg images as symbols and makes them available for injection in
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) as `htmlWebpackPlugin.files.svgstore`

### Reasoning / Alternatives
This plugin aims to do what [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) and [grunt-svgstore](https://github.com/FWeinb/grunt-svgstore) does.
There are other webpack plugins that handle svg sprites in a more traditional webpack way and I encourage you to check them out first.

## Install

```shell
npm i svgstore-webpack-plugin
yarn add svgstore-webpack-plugin
```

## Usage

### Options
You can specify loader options the regular way in your webpack config:
```js
const SvgstoreWebpackPlugin = require("svgstore-webpack-plugin");

{
    ...
    pluginsmodule: [
        ...
        new SvgstoreWebpackPlugin({
            src: // glob specifing your svg icons/sprites,
            svgOptions: // optional options object for the svgstore package
            context: // root/context for the src glob
        })
    ]
    ...
}
```

## Contributing
All PRs are welcome! Note that [conventional changlog/standard version](https://github.com/conventional-changelog/standard-version) is used for versioning and commit messages.

## Roadmap
* Tests
* Ability to define several glob patterns in `src`
