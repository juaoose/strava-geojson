# strava-geojson

Export runs from [Strava](https://www.strava.com/) into
[GeoJSON](http://geojson.org/).

## get a token

The easiest way to get a token is to use [Strava API Playground](https://developers.strava.com/playground/).

* go to [Strava API Playground](https://developers.strava.com/playground/)
* click 'Authorize'
* paste you app info, available in your [Strava settings](https://www.strava.com/settings/api)
* select one of 'activity:read' or 'activity:read_all' for the 'scope'
* click 'Authorize'
* execute a request from the playground and copy the 'access_token'

## install

With node,

    npm i -g strava-geojson

## cli

```sh
$ strava-geojson YOUR_ACCESS_TOKEN_HERE > my_runs.geojson
```

## node api

```js

var stravaExport = require('strava-geojson');

stravaExport(STRAVA_TOKEN).pipe(process.stdout);
```
