/*global it, describe */

const
  RMR = require('./index'),
  chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

describe('rmr-util', function() {

  it('RMR.XHR', function extensionFor() {
    expect(RMR.XHR.request({})).to.equal(null);
  });

  it('RMR.Object', function fromPath() {
    expect(RMR.Object.queryString({})).to.equal('');
  });
});
