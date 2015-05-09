'use strict';

var events = require('events');
var ioCore = require('./io-core.js');

// water level
var waterLevel = new events.EventEmitter();
waterLevel.goUp = function () { waterLevel.value++; waterLevel.emit('change'); };
waterLevel.goDown = function () { waterLevel.value--; if (waterLevel.value < 0) { waterLevel.value = 0; }; waterLevel.emit('change'); };
waterLevel.value = 0;

var waterSensorHigh = ioCore.waterSensorHigh;
var waterSensorLow = ioCore.waterSensorLow;
var pumpRelay = ioCore.pumpRelay;

var lowThreshold = 2;
var highThreshold = 10;

// rising water interval
setInterval(function () {
	waterLevel.goUp();
}, 1000);

// threshold updater
waterLevel.on('change', function () {
	waterSensorHigh.update(waterLevel.value >= highThreshold);
	waterSensorLow.update(waterLevel.value >= lowThreshold);
	console.log({
		low: waterSensorLow.value,
		high: waterSensorHigh.value,
		pump: pumpRelay.value,
		waterLevel: waterLevel.value
	});
});

// pump water level modifier
setInterval(function () {
	if (pumpRelay.value === true) {
		waterLevel.goDown();
	}
}, 530)

exports.waterSensorHigh = waterSensorHigh;
exports.waterSensorLow = waterSensorLow;
exports.pumpRelay = pumpRelay;