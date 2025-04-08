'use strict'

var gPlaces
const PLACES_STORAGE_KEY = 'placesDB'
_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    const placeIdx = gPlaces.findIndex((place) => place.id === placeId)
    gPlaces.splice(placeIdx, 1)
    _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    const place = _createPlace(name, lat, lng, zoom)
    gPlaces.push(place)
    _savePlacesToStorage()
    return place
}

function getPlaceById(placeId) {
    const place = gPlaces.find((place) => place.id === placeId)
    return place
}

function _createPlace(name, lat, lng, zoom) {
    return {
        id: makeRandId(),
        name,
        lat,
        lng,
        zoom,
    }
}

function _createPlaces() {
    gPlaces = loadFromStorage(PLACES_STORAGE_KEY)

    if (!gPlaces || !gPlaces.length) {
        var places = []
        for (let i = 0; i < 2; i++) {
            places.push(_createPlace('Place ' + i, 40.453231 + i / 100, -3.686740 + i / 100, 13))
        }
        gPlaces = places
        _savePlacesToStorage()
    }
}

function _savePlacesToStorage() {
    saveToStorage(PLACES_STORAGE_KEY, gPlaces)
}

function getPlacesAsCSV() {
    if (!gPlaces.length) return 'No Places'
    const csvLines = gPlaces.map(({ id, lat, lng, name }) => `${id},${lat},${lng},${name}\n`)
    csvLines.unshift('Id,Lat,Long,Name\n')
    console.log('csvLines', csvLines.join(''));
    return csvLines.join('')
}