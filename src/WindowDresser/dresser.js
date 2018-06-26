const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const localPath = (...files) => path.resolve(__dirname, ...files);

const loadData = file => JSON.parse(fs.readFileSync(localPath(`data/${file}.json`), 'utf8'));

const config = loadData('config');
const sourceData = loadData('source');
const outputData = loadData('output');

exports.sourcePaths = type => sourceData[type].map(source => localPath(config.src, source.file));

const isLandscape = image => image.bitmap.width >= image.bitmap.height;

const dimensions = (width, height, src) => {
  if (isLandscape(src) !== (height > width)) { // Effectively an XOR gate
    return [width, height];
  }

  return [height, width];
};

const renderFunction = {
  cover: image => (width, height, name) =>
    image.clone().cover(width, height).write(localPath(config.dest, name)),
  icon: image => (width, height, name) =>
    image.clone().resize(width, height).write(localPath(config.dest, name)),
  screens: image => (width, height, name, index) =>
    image.clone().cover(...dimensions(width, height, image)).write(localPath(config.dest, name.replace(/X/, index + 1))),
};

const writeFromImage = (type, platforms, index) => image =>
  platforms.forEach(platform =>
    outputData[type][platform].forEach(data =>
      renderFunction[type](image)(...data, index)));

exports.write = ([type, platforms]) =>
  exports.sourcePaths(type).forEach((source, index) =>
    Jimp.read(source).then(writeFromImage(type, platforms, index)));
