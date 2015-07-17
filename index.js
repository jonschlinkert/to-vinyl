/*!
 * to-vinyl <https://github.com/jonschlinkert/to-vinyl>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');
var lazy = require('lazy-cache')(require);
var Vinyl = lazy('vinyl');

module.exports = function toVinyl(obj, File, keys) {
  if (Array.isArray(File)) {
    keys = File;
    File = Vinyl();
  }

  if (!isObject(obj)) {
    throw new TypeError('to-vinyl expects an object.');
  }

  if (typeof obj.content === 'string' && !Buffer.isBuffer(obj.contents)) {
    obj.contents = new Buffer(obj.content);
  }

  // Use the passed `File`, or lazily require `Vinyl`
  File = File || Vinyl();

  // only add `contents` and `path`, so we can allow the
  // user to control which keys to mixin
  var file = new File({
    contents: obj.contents,
    path: obj.path
  });

  keys = keys || Object.keys(obj);
  var len = keys.length;
  while (len--) {
    var key = keys[len];
    if (keys.indexOf(key) !== -1 && !(key in file)) {
      file[key] = obj[key];
    }
  }
  return file;
};
