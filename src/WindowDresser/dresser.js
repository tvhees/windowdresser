const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const localPath = (...files) => path.resolve(__dirname, ...files);

const loadData = file => JSON.parse(fs.readFileSync(localPath(`data/${file}.json`), 'utf8'));

const config = loadData('config');
const source = loadData('source');
const output = loadData('output');

exports.sourcePath = type => localPath(config.src, source[type].file);

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
  screens: image => (width, height, name) =>
    image.clone().cover(...dimensions(width, height, image)).write(localPath(config.dest, name)),
};

const writeFromImage = (type, platforms) => image =>
  platforms.forEach(platform =>
    output[type][platform].forEach(data =>
      renderFunction[type](image)(...data)));

exports.write = ([type, platforms]) => Jimp.read(exports.sourcePath(type))
  .then(writeFromImage(type, platforms));
