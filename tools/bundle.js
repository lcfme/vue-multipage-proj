const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const babelify = require('babelify');
const vueify = require('vueify');
const glob = require('glob');
const FakeEntryStream = require('./fake-entry-stream');
const GenerateHTML = require('./generate-html');

const commonLib = ['vue', 'jquery', 'axios'];

function compileVueFile(filePath) {
  const fileName = './' + path.relative(path.join(__dirname, '..'), filePath);
  const entryStream = FakeEntryStream(fileName);
  const htmlStream = GenerateHTML();
  var b = browserify();
  b.add(entryStream);
  b.transform(babelify);
  b.transform(vueify);
  b.bundle().pipe(htmlStream);
  return htmlStream;
}

function buildPages() {
  glob('pages/*.vue');
}
