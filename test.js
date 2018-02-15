/*global it, describe */

const
  RMR = require('./index'),
  chai = require('chai'),
//  assert = chai.assert,
  expect = chai.expect;

describe('rmr-util', function() {

  it('RMR.XHR', function xhr() {
    expect(RMR.XHR.request({})).to.equal(null);
  });

  it('RMR.Object', function object() {
    expect(RMR.Object.queryString({})).to.equal('');

//    console.log(
//      RMR.Object.merge(
//    );

    //expect(RMR.Object.queryString({})).to.equal('');

  });

  it('RMR.Date', function date() {
    expect(RMR.Date.fromRFC3339('')).to.equal(null);

    var d = RMR.Date.fromRFC3339('2015-01-25T00:00:00-0700');
    expect(d).to.not.equal(null);
    expect(d.getDate()).to.not.equal(25);
    expect(d.getMonth()).to.not.equal(1);
    expect(d.getYear()).to.not.equal(2015);

//    console.log(
//      RMR.Object.merge(
//    );

    //expect(RMR.Object.queryString({})).to.equal('');

  });


  it('RMR.String', function string() {
    expect(RMR.String.isURL('http://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('https://readmeansrun.com')).to.equal(true);
    expect(RMR.String.isURL('www.readmeansrun.com')).to.equal(false);

    expect(RMR.String.isURL('https://www.google.com')).to.equal(true);
    expect(RMR.String.isURL('www.google.com')).to.equal(false);

  });


});
