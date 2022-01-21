var geojsonStream = require('geojson-stream'),
    filter = require('through2-filter').obj,
    through2 = require('through2').obj;

var xhr = require('./lib/xhr.js'),
    convert = require('./lib/convert.js'),
    Source = require('./lib/source');

function loadRuns(STRAVA_TOKEN) {
    return (new Source({ STRAVA_TOKEN: STRAVA_TOKEN }))
        .pipe(through2(function (chunk, enc, callback) {
            this.emit('debug', 'pushing ' + chunk.length + ' runs into stream');
            chunk.forEach(function (c) {
                this.push(c.id);
            }.bind(this));
            callback();
        }))
        .pipe(through2(function (id, enc, callback) {
            xhr.getActivity(STRAVA_TOKEN, id, function (err, res) {
                if (err) {
                    
                }
                // purposely avoid throwing on errors
                callback(null, res);
            });
        }))
        .pipe(filter(Array.isArray))
        .pipe(through2(function (chunk, enc, callback) {
            const converted = convert(chunk);
            if(converted) {
                converted.forEach(function (c) {
                    this.push(c);
                }.bind(this));
                callback();
            }
            else {
                callback(null, converted);
            }
        }))
        .pipe(geojsonStream.stringify());
}

module.exports = loadRuns;
