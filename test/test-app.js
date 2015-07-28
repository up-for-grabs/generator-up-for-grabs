'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('up-for-grabs:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ name: 'blarg' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'blarg.yml'
    ]);
  });
});
