# Pi Temperature Monitor

## Description
This is a project I have been using to get some basic temperature monitoring working with a Raspberry Pi.  It's being uploaded to Github in case others find it useful, but no guarantee is made this will work for you.

The code was developed using the following equipment:
* Raspberry Pi 2
* DHT-22 temperature/humidity sensor

This page was gathered via data located on [Adafruit](http://www.adafruit.com) and various [Youtube videos](https://www.youtube.com/watch?v=IHTnU1T8ETk) on wiring examples.


## Setup / Running
1. Wire the DHT-22 sensor to the Raspberry Pi.  There are many tutorials on this, I used [this one](https://www.youtube.com/watch?v=IHTnU1T8ETk).
2. Download, compile, and install [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library used for reading sensor data.
3. Clone repo.
4. Edit `app.js` with desired interval time and the GPIO pin number.
5. `npm install`.  If you skip step 2 you'll see a warning about completing it.
6. `sudo node app.js`.  The library used to read the data needs root access, so sudo will be required unless permissions are modified.