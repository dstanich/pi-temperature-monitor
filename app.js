var sensorUtil = require('./sensor-util');

var GPIO_PIN = 4;
var SECONDS_BETWEEN_READINGS = 30;


// Loop for reading the temperature after an interval
function runLoop(secondsToWait) {
	setInterval(function() {
		try {
			var result = sensorUtil.read();
			console.log(new Date().toISOString() + ':  Temperature: ' + result.fTemp + '  Humidity: ' + result.humidity);
		} catch (exception) {
			console.error('Exception reading temp:', exception);
		}
	}, secondsToWait * 1000);
}


console.log('-------------------');
console.log('TEMP SENSOR MONITOR');
console.log('-------------------');

if (sensorUtil.initialize(GPIO_PIN)) {
	runLoop(SECONDS_BETWEEN_READINGS);
} else {
	console.error('Failed to initialize sensor');
	process.exit(-1);
}
