'use strict';

var events = require('events');

//waterSensorHigh
exports.waterSensorHigh = new events.EventEmitter();
exports.waterSensorHigh.value = false;
exports.waterSensorHigh.update = function (value) { 
	if (this.value != value) {
		this.value = value;
		this.emit('changed');
	}
};

// waterSensorLow
exports.waterSensorLow = new events.EventEmitter();
exports.waterSensorLow.value = false;
exports.waterSensorLow.update = function (value) { 
	if (this.value != value) {
		this.value = value;
		this.emit('changed');
	}
};

// pump relay
var pumpRelay = new events.EventEmitter();
pumpRelay.value = false;
pumpRelay.turnOn = function () {
 	this.value = true;
 	this.emit('change');
 	this.emit('turnedOn');
};
pumpRelay.turnOff = function () {
 	this.value = false;
 	this.emit('change');
 	this.emit('turnedOff');
};
exports.pumpRelay = pumpRelay;



