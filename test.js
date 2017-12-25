/*global it, describe */

const
  RMR = require('./index'),
  chai = require('chai'),
//  assert = chai.assert,
  expect = chai.expect;

describe('rmr-util', function() {

  it('RMR.XHR', function extensionFor() {
    expect(RMR.XHR.request({})).to.equal(null);
  });

  it('RMR.Object', function fromPath() {
    expect(RMR.Object.queryString({})).to.equal('');

//    console.log(
//      RMR.Object.merge(
//    );

    //expect(RMR.Object.queryString({})).to.equal('');

  });

  it('RMR.String', function fromPath() {
    expect(RMR.String.isURL('http://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('https://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('www.readmeansrun.com')).to.equal(false);

    expect(RMR.String.isURL('https://www.google.com')).to.equal(true);
    expect(RMR.String.isURL('www.google.com')).to.equal(false);

  });


});
