var sensorLib = require('node-dht-sensor');

function initialize(gpioPin) {
	return sensorLib.initialize(22, gpioPin);
}

function read() {
	var readout = sensorLib.read();
	var cTemp = readout.temperature.toFixed(2);
	var fTemp = (cTemp * 1.8 + 32).toFixed(2);
	
	return {
		cTemp: cTemp,
		fTemp: fTemp,
		humidity: readout.humidity.toFixed(2)
	}
}

module.exports = {
	initialize: initialize,
	read: read
};