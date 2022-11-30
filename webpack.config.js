const path = require("path");
var express = require('express');
const expressStaticGzip = require("express-static-gzip");
var app = express();
app.use(
  expressStaticGzip("dist")
)
const CompressionPlugin = require("compression-webpack-plugin");


let sassImplementation;
try {
  // tslint:disable-next-line:no-implicit-dependencies
  sassImplementation = require("node-sass");
} catch {
  sassImplementation = require("sass");
}

module.exports = {
  // Fix for: https://github.com/recharts/recharts/issues/1463
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: sassImplementation,
              sourceMap: false,
              sassOptions: {
                precision: 8,
              },
            },
          },
        ],
      },
    ],
  },
  plugins:[
    new CompressionPlugin({
      test: /\.(js|css|html|txt|eot|otf|ttf|gif)$/,
      filename(info){
        let opFile= info.path.split('.'),
        opFileType =  opFile.pop(),
        opFileName = opFile.join('.');
        return `${opFileName}.${opFileType}.gzip`;
      },
         algorithm:"gzip",
})
  ],
};
