/*!
 * to-vinyl <https://github.com/jonschlinkert/to-vinyl>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var toTemplate = require('to-template');
var toVinyl = require('./');
require('should');
require('mocha');

describe('to-vinyl', function () {
  describe('properties', function () {
    it('should create a template object from a vinyl file object:', function () {
      var file = toVinyl({path: process.cwd() + '/README.md', content: '---\ntitle: README\n---\nThis is content'});

      toTemplate(file).should.eql({
        history: [path.resolve('./README.md')],
        cwd: path.resolve('.'),
        base: path.resolve('.'),
        content: '---\ntitle: README\n---\nThis is content',
        relative: 'README.md',
        path: path.resolve('./README.md'),
        data: {}
      });
    });
  });

  it('should throw an error when an object is not passed:', function () {
    (function () {
      toVinyl();
    }).should.throw('to-vinyl expects an object.');
  });
});
