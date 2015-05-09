'use strict';

switch (process.arch) {
	case 'arm':
		exports.create = function () { return require('./io-rpi.js') };
		break;
	default:
		exports.create = function () { return require('./io-fake.js') };
		break;
}
