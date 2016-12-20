var fs = require('fs');
var sensorUtil = require('./sensor-util');

var GPIO_PIN = 4;
var SECONDS_BETWEEN_READINGS = 30;

var JSON_FLAG_ENABLED = false;
var JSON_FILE = './temp_output.json';


// Loop for reading the temperature after an interval
function runLoop(secondsToWait) {
	var firstLoop = true;
	setInterval(function() {
		try {
			// Get the data from the sensor
			var result = sensorUtil.read();
			var curTime = new Date().toISOString();
			console.log(curTime + ':  Temperature: ' + result.fTemp + '  Humidity: ' + result.humidity);

			// If JSON output enabled, append to the file
			if (JSON_FLAG_ENABLED) {
				// Set line prefix depending on if first loop
				var lineStart = ',';
				if (firstLoop) {
					lineStart = '[';
				}

				// Append to the file
				fs.appendFile(JSON_FILE, lineStart + JSON.stringify({
					'time': curTime,
					'temperature': result.fTemp,
					'humidity': result.humidity
				}) + '\n');
			}
		} catch (exception) {
			console.error('Exception reading temp:', exception);
		} finally {
			firstLoop = false;
		}
	}, secondsToWait * 1000);
}


console.log('-------------------');
console.log('TEMP SENSOR MONITOR');
console.log('-------------------');
console.log('Specify --json flag to output to JSON file.\n');

// Check for JSON output flag
if (process.argv.length > 2 && process.argv[2] === '--json') {
	JSON_FLAG_ENABLED = true;
	fs.writeFile(JSON_FILE, '');
}

// Init sensor and start the run loop
if (sensorUtil.initialize(GPIO_PIN)) {
	runLoop(SECONDS_BETWEEN_READINGS);
} else {
	console.error('Failed to initialize sensor');
	process.exit(-1);
}

// Catch CTRL+C on Linux to end capture
process.on('SIGINT', function() {
	console.log('Ending application');
	if (JSON_FLAG_ENABLED) {
		fs.appendFileSync(JSON_FILE, ']');
	}

	process.exit(0);
});