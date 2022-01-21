module.exports = convert;

function convert(stream) {
    if (!stream || !stream.filter) return;
    const filter = stream.filter((e) => e.type === 'latlng');
    if (filter && filter[0] && filter[0].data) {
        const converted = filter[0].data.map((coord) => {
            return {
                type: 'Feature',
                properties: {
                    bitrate: randomInt()
                },
                geometry: {
                    type: 'Point',
                    coordinates: coord.slice().reverse()
                },
            };
        });
        return converted;
    }
}

function randomInt() {
    return Math.floor(Math.random() * 10000);
}
