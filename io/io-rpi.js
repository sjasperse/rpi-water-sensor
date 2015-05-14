'use strict';

var jfive = require('johnny-five');
var Raspi = require('raspi-io');
var board = new jfive.Board({
  io: new Raspi() 
});

// ioCore tems
var ioCore = require('./io-core.js');
var waterSensorHigh = ioCore.waterSensorHigh;
var waterSensorLow = ioCore.waterSensorLow;
var pumpRelay = ioCore.pumpRelay;


var ioSensorHigh = null;
var ioSensorLow = null;
var ioPumpRelay = null;

board.on('ready', function () {
  ioSensorLow = new jfive.Sensor({ pin: 'P1-36', type: 'digital' });
  ioSensorHigh = new jfive.Sensor({ pin: 'P1-38', type: 'digital' });
  ioPumpRelay = new jfive.Relay('P1-4');

  // sensor updator
  setInterval(function () {
  	waterSensorLow.update(ioSensorLow === 0);
  	waterSensorHigh.update(ioSensorHigh === 0);
  }, 100);

  pumpRelay.on('turnedOn', ioPumpRelay.on);
  pumpRelay.on('turnedOff', ioPumpRelay.off);
});

exports.waterSensorHigh = waterSensorHigh;
exports.waterSensorLow = waterSensorLow;
exports.pumpRelay = pumpRelay;