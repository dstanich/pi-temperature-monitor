var sensorLib = require('node-dht-sensor');


console.log('TEMP TESTER');

var sensor = {
    initialize: function () {
        return sensorLib.initialize(22, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        var cTemp = readout.temperature.toFixed(2);
        var fTemp = (cTemp * 1.8 + 32).toFixed(2);
        console.log('Temperature: ' + cTemp + 'C  ' + fTemp + 'F, ' +
            'Humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}