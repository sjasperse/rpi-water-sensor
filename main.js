'use strict';

var ioFactory = require('./io/io-factory.js');
var io = ioFactory.create();

io.waterSensorHigh.on('changed', function () {
	if (this.value === true) {
		io.pumpRelay.turnOn();

		io.waterSensorLow.once('changed', function () {
			io.pumpRelay.turnOff();
		});
	}
});


