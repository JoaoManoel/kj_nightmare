var Q = require('q');

var expect = require('chai').expect; // jshint ignore:line

var Nightmare = require('nightmare');
var nightmare = new Nightmare({show: true})

function google() {
  var deferred = Q.defer();
  nightmare
    .goto('http://google.com')
    .wait()
    .type('#lst-ib', 'Palmeiras')
    .click('input[name="btnK"]')
    .wait('.r')
    .pdf('google.pdf')
    .evaluate(function () {
      url = document.getElementsByClassName('r')[0].childNodes[0].href;
      return url;
    })
    .run(function(err, url) {
      // TODO if err -> deferred.reject... algo assim... senao deferred.resolve
      deferred.resolve(url);
    })
    .end();

    return deferred.promise;
  };

function palmeiras(url) {
  var deferred = Q.defer();
  new Nightmare({show: true})
    .goto(url)
    .wait('.fancybox-close')
    .click('.fancybox-close')
    .type('.buscaI', 'Deu certo !!')
    .run(function(err, done) {
      deferred.resolve("DEU TUDO CERTO !!");
    });

    return deferred.promise;
};

function ultimoMetodo(mensagem) {
  console.log(mensagem);
};

google().then(palmeiras).then(ultimoMetodo);
